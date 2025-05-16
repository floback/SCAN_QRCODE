"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1713300000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1713300000000 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'char',
                    length: '36',
                    isPrimary: true,
                    default: '(UUID())',
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '255',
                },
                {
                    name: 'type_user',
                    type: 'enum',
                    enum: ['owner', 'admin', 'user'],
                    default: `'user'`,
                },
                {
                    name: 'status',
                    type: 'boolean',
                    default: true,
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
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1713300000000 = CreateUsersTable1713300000000;
//# sourceMappingURL=1745025837812-CreateUserTable.js.map