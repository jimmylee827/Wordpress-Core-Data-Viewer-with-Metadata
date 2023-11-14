import { queryDatabaseForMetadata } from '../../../../utils/db';

export default async function handler(req, res) {
    const { type, id } = req.query;

    try {
        // Ensure type and id are valid
        if (!type || !id) {
            throw new Error("Type or ID not provided");
        }

        // Query the database for metadata
        const metadata = await queryDatabaseForMetadata(type, id);

        // Send the metadata as a response
        res.status(200).json(metadata);
    } catch (error) {
        // Handle any errors
        res.status(500).json({ message: error.message });
    }
}
