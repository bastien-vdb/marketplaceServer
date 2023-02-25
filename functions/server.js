const Moralis = require('moralis').default;
const { EvmChain } = require('@moralisweb3/common-evm-utils');

// Define the serverless function
exports.handler = async (event, context) => {


    try {
        // Parse the address parameter from the URL 
        console.log('1er message');
        console.log(event.body);
        const { address } = JSON.parse(event.body);
        console.log(address);

        // Ensure that the address parameter is present
        if (!address) {
            return {
                statusCode: 400,
                body: 'Please provide an address parameter',
            };
        }

        const MORALIS_API_KEY = 'B23o2RvkbaPp28e6TardbHQFyed6aXS7fBMECKjLUD7UCQvrGZeg8FW52Ac8gHSF';

        await Moralis.start({
            apiKey: MORALIS_API_KEY,
        });

        const chain = EvmChain.GOERLI;

        const data = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
        });

        // Return the NFT data as JSON with CORS headers
        const response = {
            statusCode: 200,
            body: JSON.stringify(data),
        };
        return response;
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'An error occurred' }),
        };
    }
};
