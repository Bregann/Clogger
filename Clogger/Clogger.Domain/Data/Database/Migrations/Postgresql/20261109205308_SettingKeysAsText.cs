using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Clogger.Domain.Data.Database.Migrations.Postgresql
{
    /// <inheritdoc />
    public partial class SettingKeysAsText : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Key",
                table: "EnvironmentalSettings",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            // Keys were stored as the enum's number; ProjectMonitorApiKey was 0
            migrationBuilder.Sql("UPDATE \"EnvironmentalSettings\" SET \"Key\" = 'ProjectMonitorApiKey' WHERE \"Key\" = '0';");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("UPDATE \"EnvironmentalSettings\" SET \"Key\" = '0' WHERE \"Key\" = 'ProjectMonitorApiKey';");
            migrationBuilder.Sql("ALTER TABLE \"EnvironmentalSettings\" ALTER COLUMN \"Key\" TYPE integer USING \"Key\"::integer;");
        }
    }
}
