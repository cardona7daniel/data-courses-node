import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1654141882950 implements MigrationInterface {
    name = 'Initial1654141882950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`course_content\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(500) NOT NULL, \`courseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`acceptance\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`courseContentId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rankings\` (\`id\` int NOT NULL AUTO_INCREMENT, \`score\` int NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`isEmailConfirmed\` tinyint NOT NULL DEFAULT 0, \`role\` enum ('STUDENT', 'TEACHER', 'ADMIN') NOT NULL DEFAULT 'STUDENT', \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users_by_courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`userId\` int NULL, \`courseId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`course_content\` ADD CONSTRAINT \`FK_f576cd9875b81147fa515f68b56\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`acceptance\` ADD CONSTRAINT \`FK_ed17e6150ee2d2653470b5ebf1c\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`acceptance\` ADD CONSTRAINT \`FK_d4b6768e00d0ba3583db7861a71\` FOREIGN KEY (\`courseContentId\`) REFERENCES \`course_content\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`rankings\` ADD CONSTRAINT \`FK_430fa616d89023b764c714fbcf5\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_by_courses\` ADD CONSTRAINT \`FK_3cad09fb8272d6a531b9247ad9f\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users_by_courses\` ADD CONSTRAINT \`FK_65f1bc56a7a465dc65b67732ad0\` FOREIGN KEY (\`courseId\`) REFERENCES \`courses\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users_by_courses\` DROP FOREIGN KEY \`FK_65f1bc56a7a465dc65b67732ad0\``);
        await queryRunner.query(`ALTER TABLE \`users_by_courses\` DROP FOREIGN KEY \`FK_3cad09fb8272d6a531b9247ad9f\``);
        await queryRunner.query(`ALTER TABLE \`rankings\` DROP FOREIGN KEY \`FK_430fa616d89023b764c714fbcf5\``);
        await queryRunner.query(`ALTER TABLE \`acceptance\` DROP FOREIGN KEY \`FK_d4b6768e00d0ba3583db7861a71\``);
        await queryRunner.query(`ALTER TABLE \`acceptance\` DROP FOREIGN KEY \`FK_ed17e6150ee2d2653470b5ebf1c\``);
        await queryRunner.query(`ALTER TABLE \`course_content\` DROP FOREIGN KEY \`FK_f576cd9875b81147fa515f68b56\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`users_by_courses\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`rankings\``);
        await queryRunner.query(`DROP TABLE \`acceptance\``);
        await queryRunner.query(`DROP TABLE \`course_content\``);
    }

}
