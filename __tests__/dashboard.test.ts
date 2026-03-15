import { deleteLink, upsertLink, createApiKey } from "@/app/dashboard/actions";
import { prismaMock } from "../singleton";
import { auth } from "@/lib/auth";
import { Link } from "../generated/prisma";

jest.mock("@/lib/auth", () => ({
  auth: jest.fn(),
}));

const mockAuth = auth as jest.Mock;

describe("Dashboard Actions", () => {
  const mockUser = { id: "user_123", email: "faried@example.com" };

  beforeEach(() => {
    jest.clearAllMocks();
    mockAuth.mockResolvedValue({ user: mockUser });
  });

  describe("upsertLink", () => {
    it("should throw error if user is not authenticated", async () => {
      mockAuth.mockResolvedValueOnce(null);
      await expect(
        upsertLink({ destination: "https://google.com" }),
      ).rejects.toThrow("Unauthorized");
    });

    it("should rate limit if user created 5 links in the last minute", async () => {
      prismaMock.link.count.mockResolvedValue(5);

      await expect(
        upsertLink({ destination: "https://google.com" }),
      ).rejects.toThrow("Slow down!");

      expect(prismaMock.link.create).not.toHaveBeenCalled();
    });

    it("should create a new link if slug doesn't exist", async () => {
      prismaMock.link.count.mockResolvedValue(0);
      prismaMock.link.findUnique.mockResolvedValue(null);

      const result = await upsertLink({
        destination: "https://test.com",
        slug: "new-link",
      });

      expect(prismaMock.link.create).toHaveBeenCalledWith({
        data: expect.objectContaining({
          slug: "new-link",
          userId: mockUser.id,
        }),
      });
      expect(result.success).toBe(true);
    });

    it("should prevent updating a slug owned by another user", async () => {
      prismaMock.link.count.mockResolvedValue(0);
      prismaMock.link.findUnique.mockResolvedValue({
        id: 1,
        userId: "different_user",
        slug: "taken",
      } as Link);

      await expect(
        upsertLink({ destination: "https://test.com", slug: "taken" }),
      ).rejects.toThrow("This short code is already taken by another user.");
    });
  });

  describe("deleteLink", () => {
    it("should delete the link with parsed integer ID", async () => {
      const formData = new FormData();
      formData.append("id", "99");

      await deleteLink(formData);

      expect(prismaMock.link.delete).toHaveBeenCalledWith({
        where: { id: 99 },
      });
    });
  });

  describe("createApiKey", () => {
    it("should delete old keys and create a new hashed key", async () => {
      const result = await createApiKey();

      // Verify old keys for this user are purged
      expect(prismaMock.apiKey.deleteMany).toHaveBeenCalledWith({
        where: { userId: mockUser.id },
      });

      // Verify new key is created
      expect(prismaMock.apiKey.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            userId: mockUser.id,
            name: "Default Key",
          }),
        }),
      );

      // Verify we return the plain text key to the user
      expect(result.plainKey).toBeDefined();
    });
  });
});
