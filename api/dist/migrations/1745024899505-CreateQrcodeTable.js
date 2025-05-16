"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQrcodeTable1713300000002 = void 0;
const typeorm_1 = require("typeorm");
class CreateQrcodeTable1713300000002 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'qrcode',
            columns: [
                {
                    name: 'id',
                    type: 'char',
                    length: '36',
                    isPrimary: true,
                    default: '(UUID())',
                },
                {
                    name: 'id_user',
                    type: 'char',
                    length: '36',
                    isNullable: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'code',
                    type: 'varchar',
                },
                {
                    name: 'img',
                    type: 'text',
                },
                {
                    name: 'link_add',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'number_fone',
                    type: 'varchar',
                    length: '20',
                },
                {
                    name: 'status',
                    type: 'boolean'
                },
                {
                    name: 'creation_date',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'update_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                }
            ],
        }));
        await queryRunner.createForeignKey('qrcode', new typeorm_1.TableForeignKey({
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('qrcode');
        if (table) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.includes('id_user'));
            if (foreignKey) {
                await queryRunner.dropForeignKey('qrcode', foreignKey);
            }
        }
        await queryRunner.dropTable('qrcode');
    }
}
exports.CreateQrcodeTable1713300000002 = CreateQrcodeTable1713300000002;
//# sourceMappingURL=1745024899505-CreateQrcodeTable.js.map