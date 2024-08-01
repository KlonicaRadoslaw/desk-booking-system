using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace api.Migrations
{
    public partial class DeskAvailability : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "b0982f5c-e422-4619-bab1-3b81c20ce4b1");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "f3844682-0c5b-43bb-94a7-0b3ba4b45bd8");

            migrationBuilder.AddColumn<bool>(
                name: "isAvailable",
                table: "Desks",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5bc772af-cb4a-4646-9176-f361fa6df27b", "55566ac7-ae2f-436b-bf6b-35e1b661d9ad", "User", "USER" },
                    { "dbb92aed-f396-414a-8c15-c1eb5a395f1d", "f99cee55-77c1-449c-a938-6305d74d1304", "Admin", "ADMIN" }
                });

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 1,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 2,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 3,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 4,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 5,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 6,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 7,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 8,
                column: "isAvailable",
                value: true);

            migrationBuilder.UpdateData(
                table: "Desks",
                keyColumn: "Id",
                keyValue: 9,
                column: "isAvailable",
                value: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5bc772af-cb4a-4646-9176-f361fa6df27b");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dbb92aed-f396-414a-8c15-c1eb5a395f1d");

            migrationBuilder.DropColumn(
                name: "isAvailable",
                table: "Desks");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "b0982f5c-e422-4619-bab1-3b81c20ce4b1", "e89d1638-2a45-4311-9fe6-1634e1e0a1a6", "Admin", "ADMIN" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "f3844682-0c5b-43bb-94a7-0b3ba4b45bd8", "46e5c0bb-5c69-4b1b-8e41-f335f2a1dc2f", "User", "USER" });
        }
    }
}
