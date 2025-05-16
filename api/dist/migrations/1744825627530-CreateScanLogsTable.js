"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateScanLogsTable1713300000003 = void 0;
const typeorm_1 = require("typeorm");
class CreateScanLogsTable1713300000003 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'scan_logs',
            columns: [
                {
                    name: 'id',
                    type: 'char',
                    length: '36',
                    isPrimary: true,
                    default: '(UUID())',
                },
                {
                    name: 'id_qrcode',
                    type: 'char',
                    length: '36',
                    isNullable: true,
                },
                {
                    name: 'ip',
                    type: 'varchar',
                },
                {
                    name: 'country',
                    type: 'varchar',
                },
                {
                    name: 'city',
                    type: 'varchar',
                },
                {
                    name: 'region',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'float',
                },
                {
                    name: 'longitude',
                    type: 'float',
                },
                {
                    name: 'create_date',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
        await queryRunner.createForeignKey('scan_logs', new typeorm_1.TableForeignKey({
            columnNames: ['id_qrcode'],
            referencedColumnNames: ['id'],
            referencedTableName: 'qrcode',
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('scan_logs');
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes('id_qrcode'));
            if (foreignKey) {
                await queryRunner.dropForeignKey('scan_logs', foreignKey);
            }
        }
        await queryRunner.dropTable('scan_logs');
    }
}
exports.CreateScanLogsTable1713300000003 = CreateScanLogsTable1713300000003;
//# sourceMappingURL=1744825627530-CreateScanLogsTable.js.map