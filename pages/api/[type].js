import { queryDatabase } from '../../utils/db';

export default async function handler(req, res) {
    const { type } = req.query;
    const data = await queryDatabase(type); // Implement this function
    res.status(200).json(data);
}
