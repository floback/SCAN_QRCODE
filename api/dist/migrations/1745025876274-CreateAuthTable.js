"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthTable1713300000001 = void 0;
const typeorm_1 = require("typeorm");
class CreateAuthTable1713300000001 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'auth',
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
                    name: 'attempt_time',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'token',
                    type: 'char',
                    length: '255'
                }
            ],
        }));
        await queryRunner.createForeignKey('auth', new typeorm_1.TableForeignKey({
            columnNames: ['id_user'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('auth');
        if (!table)
            return;
        const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('id_user') !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey('auth', foreignKey);
        }
        await queryRunner.dropTable('auth');
    }
}
exports.CreateAuthTable1713300000001 = CreateAuthTable1713300000001;
//# sourceMappingURL=1745025876274-CreateAuthTable.js.map