import { AppDataSource } from "@/data-source"

export const databaseConnection = async () => {
    return await AppDataSource.initialize();
}