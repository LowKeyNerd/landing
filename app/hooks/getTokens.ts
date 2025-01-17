"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

const useErgoTokens = () => {
    const [totalErgs, setTotalErgs] = useState<number | null>(null);
    const [totalRsn, setTotalRsn] = useState<number | null>(null);
    const [bridgedErgs, setBridgedErgs] = useState<number | null>(null);
    const [bridgedRsn, setBridgedRsn] = useState<number | null>(null);
    const [cardanoBalance, setCardanoBalance] = useState<number | null>(null);
    const [cardanoTokens, setCardanoTokens] = useState<number | null>(null);
    const blockfrostApiKey = "mainnetZ4Zku8txgYkN9o53Q4AkKDMcxd9Z2GCi"; //this is just a free account API key

    const specificTokenId = "8b08cdd5449a9592a9e79711d7d79249d7a03c535d17efaee83e216e80a44c4b";
    const lockedTokenUrls = [
        //30k rsn and 800 erg collateral
        "https://ergo-explorer.anetabtc.io/api/v1/addresses/ChTbcUHgBNqNMVjzV1dvCb2UDrX9nh6rGGcURCFEYXuH5ykKh7Ea3FvpFhHb9AnxXJkgAZ6WASN7Rdn7VMgkFaqP5Z5RWp84cDTmsZkhYrgAVGN7mjeLs8UxqUvRi2ArZbm35Xqk8Y88Uq2MJzmDVHLHzCYRGym8XPxFM4YEVxqzHSKYYDvaMLgKvoskFXKrvceAqEiyih26hjpekCmefiF1VmrPwwShrYYxgHLFCZdigw5JWKV4DmewuR1FH3oNtGoFok859SXeuRbpQfrTjHhGVfDsbXEo3GYP2imAh1APKyLEsG9LcE5WZnJV8eseQnYA8sACLDKZ8Tbpp9KUE7QZNFpnwGnkYx7eybbrCeFDFjTGpsBzaS6fRKrWj2J4Wy3TTyTU1F8iMCrHBF8inZPw9Kg9YEZuJMdXDFNtuaK15u86mF2s2Z5B1vdL5MtZfWThFLnixKds8ABEmGbe8n75Dym5Wv3pkEXQ6XPpaMjUxHfRJB3EfcoFM5nsZHWSTfbFBcHxSRnEiiU67cgJsBUpQn7FvEvqNLiKM4fL3yyykMtQ6RjAS8rhycszphvQa5qFrDHie4vPuTq8/balance/confirmed",
        //ergo rsn permit collateral
        "https://ergo-explorer.anetabtc.io/api/v1/addresses/LXwmG9jPiXvYd6Z1DWRazpc2wTdpW2awCB9NV5qjJx4UFoncqYxve6G1gzTVBNCsDwSu5ZPEi6LNLuPdzM1r9DUMgAzEfGghKeoGebPAyLCerZ8Us4ukQSJPj8j3TQY5JLZDqS2BRcPkmovmt7SZCKD95zoNgsitrYdmv2JhoC8Wmq7aM3DpwmhejCZ59n1ZYCAL7LsKw4zX45tH3sGLXxmeBNCCkcT2yxiziEAn2C3ybXqqab7cMhkoNdRMwXpUUpk3489kfyTY7SjbUPqPKhkH9veUS6H4U7a4HaEi7tPyueHTbjjQZjCZd5uGi5tC7jMvrgjYqByUG9PA9oeXHj89RxK5TPbbmkmsZVHVtdBzfHiexJh32LMszDRHuUc6YfisZKx9kNSSzadBdLbJUGHeCd8XaBg6w3e1uUBQDghpx2z44C2GZbAmUQSUQ2jqY8BBwEhtaxzZ69NK3dEjTFgsZ1R3nkbhbAu5Xs5fabBWZo6RvaPf8jTKRwKaNgQZrL93QV2JEZoapbRHCdvzaHHpBLr1p6nkDg2kB3rUTj6kmaabxswG8bSLAA9qYZhDCyh1QdSyUnd9T2o7qHybaoeEuqG1kEWYon4741ut8HCqbwEjKze6rDuEbnPUYzSr7kiwoPeV2GrdsVFRLgxwgHJoENgjUhj1VVKZB2q7n8S6smwf7CJyYZZCZGkg5bLpywJddmegJjk2FuLwA2VEmnrDKRGpFkhxBc2rbj974XgGcBZ66mPTtwrXUwjY9G5hUArtYs8WhsCDAH58yaHFFViaAhBNDQ3HBtFbXwh6b1osdv8zDSvncYXPx2iikhmf6TRC2DE2ENYtzhLHJmgyXmQkm7yXp6nWxJaeLnUuxRaWdxxQSPy1Wnm1GvKJYzRBhv9RdcmDnEgKs21ex5uSSdqJ4H53Qs6StxGyQ4HyjTjEVUxTbUZpnzvECgAufKkuSPyC2mYkKKGrzWmvv5sh6fyo4eAq9QnfXB9YMETMpJbx5dFpc6ZXYimSCfJbJfP1bpCe1hXkhTPWeZJ9aPX6HZEfu89ChZiX32MaSM3QnnUhRbSnzdQ2jVAtqqwjNN5SeNNvXNxS6B1UHj52TGvGrLnNUp4BWgNKAAwpBxAAB7wny9tUSXt6jHVnGHBG1vJWF7S9DeaVjKg3qR8j1bUsGqh9bVkarag4SREopK8cHwFpb2yFcdGERfaKHyekAUjVkhqySH3Vb8GiAdDbRArKV2ip4eveocsFwjoCD5i9rotksNysgi9RDjkApYm7aJegC79omCujHVYFpU6HtV2AhNVFRvVBG2xDW9YEKEm3RxrjoCttM6sFkbNX61CSiQ3LsBPvcd5Aix9NUESjbNxFwARZ75UgquvFddApn13yxSqfzVoE9L3eRnAMxd7KHudBWQsnDK/balance/confirmed",
        //cardano rsn permit collateral
        "https://ergo-explorer.anetabtc.io/api/v1/addresses/LXwmG9jPiXvYd6Z1DWRazpc2wTdpW2awCB9NV5qjJx4UFoncqYxve6G1gzTVBNCsDwSu5ZPEi6LNLuPdzM1r9DUMgAzEfGghKeoGebPAyLCerZ8Us4ukQSJPj8j3TQY5JLZBwceKrx1KHjeRRQBwBgxTkfButyeLtHgMELArAC9DDaZbYg7o2t98LMUZyArDzmK5fmhdKgeo6Dw4oZ1ENbepgqG35kR2pS63heXUeEuhH4nvqfLGHwSTanzhsQeBmYH9iqxSFfCvoRFnasoEPkWAv6PwGURqUk23wS5J9CaSadgPYRNdB915Vjf2kvxxmPFwoW9Uq1ZRo5DDS49goU3YbMgDJPnekbGQ9u9jMcwvo8FGRMiJVyEy2zdncnqPUaipekDaDowgf8EKYxBRYPo93DGga9FCVAoMC2PzRXRN1Q4X2zCx9onwMPoTWu2nFjYdx58bqzqs2ToK4S7UXZw4vpt6oSam7XN2miAfSN8WJmYRJ3FSGNfUz1ryo6N8uoecwEGeFksvbkobAvykuDGzeCNgdeNnRnMFZrco3kPvdzMf75tsRJu5ZTpTMW5mJWm6NbPJwxgV5JdxUvHPd8SCCmFKxhFywqVifp6WRMMqfVKaBdmXWG7zzN6hJZhf9EHupjR4KZExmuShvpx5bA1YyMUz1MpE9VP7vkLJWDYXfpJHJEWFRiADfSHt2RE5LzepxScfoHfpE7C6e4TBQBZd3dndxWDRREZSV45A1iXdq14AYqcsoBJ5Y8JCGHzXaGCLiBHvsXFMfUdTHhbPA8cegddhhZ2tK29UhR3veSGcjVZ1YwzVthQeJZK8RMbbbdf2s3f7dr8a7YGLU31T2jjy4tPR26ZFSadcuuMFR6QQisRP7qBKpgmUJc68fWdwNsLr8FLW8q2yipH1YnsWG389BQ9aXM4Zfb2WmXUT6JCpaeABWUFCLv6w3BkuBHyUFmmfiiHNx1E9u1VEuibAJYEkC6BEuoCKDqxMV62wdjbahsAn4fZdpQyVMK6xADbY2FXrREeaq4KDGzY4XYVZxaEZs3CEeedoZjFLbBe7ysm4MWqCiK7tucARTFF4XaxoH1C5JqqiraqRm4HBGVcjfzcyMwMHUC15m2N4AoQycb97Dn8W4Qp7s7gmchThLotvP2E7t7CXDa21cwKdVx9nh2xTJRPaXzMjt49L4AbXqT9RJ9PeRsYzKcQLcgugdDoB3vDtFBTZeoNNvf43JFpapTozoQtSfj7iNrPYfaEkNvCEzLjqJVyMPZ7gt13aySy5jDPp2vF5hGd5f6yv21PAiwQtfV47hn7y5hZfKv4T3gDE4sD6UQ2HFmhrAXmcuZ4AtfZZXpC3vgw6vhraKUFsHKjLZU3WKKAwnPW1HJC61jiutpnaBK1hDhop6FHkjvNtGrSnti/balance/confirmed",
        //"https://ergo-explorer.anetabtc.io/api/v1/addresses//balance/confirmed" btc placeholder
        //"https://ergo-explorer.anetabtc.io/api/v1/addresses//balance/confirmed" eth placeholder
    ];

    //pulling assets bridged from Ergo to Cardano
    const ergoToCardanoBridge = "https://ergo-explorer.anetabtc.io/api/v1/addresses/nB3L2PD3J4rMmyGk7nnNdESpPXxhPRQ4t1chF8LTXtceMQjKCEgL2pFjPY6cehGjyEFZyHEomBTFXZyqfonvxDozrTtK5JzatD8SdmcPeJNWPvdRb5UxEMXE4WQtpAFzt2veT8Z6bmoWN/balance/confirmed";
    //pulling assets bridged from Cardano to Ergo
    const cardanoToErgoBridge = "https://cardano-mainnet.blockfrost.io/api/v0/addresses/addr1v8kqhz5lkdxqm8qtkn4lgd9f4890v0j6advjfmk5k9amu4c535lsu";

    useEffect(() => {
        const fetchErgoWatcherCollateral = async () => {
            try {
                const results = await Promise.all(lockedTokenUrls.map(url => axios.get(url)));
                let totalErgs = 0;
                let totalRsn = 0;

                results.forEach(response => {
                    const dataObjects = response.data;
                    totalErgs += dataObjects.nanoErgs / 1000000000;

                    const token = dataObjects.tokens.find((token: any) => token.tokenId === specificTokenId);
                    if (token) {
                        const tokenDecimals = Math.pow(10, token.decimals);
                        totalRsn += token.amount / tokenDecimals;
                    }
                });

                setTotalErgs(totalErgs);
                setTotalRsn(totalRsn);

                console.log('Fetched total Ergs:', totalErgs);
                console.log('Fetched total RSN:', totalRsn);
            } catch (error) {
                console.error('Error loading Ergo tokens:', error);
            }
        };

        const fetchCardanoBridge = async () => {
            try {
                const response = await axios.get(ergoToCardanoBridge);
                const data = response.data;
                const bridgedErgs = data.nanoErgs / 1000000000;

                const token = data.tokens.find((token: any) => token.tokenId === specificTokenId);
                const bridgedRsn = token ? token.amount / Math.pow(10, token.decimals) : 0;

                setBridgedErgs(bridgedErgs);
                setBridgedRsn(bridgedRsn);

                console.log('Fetched bridged Ergs:', bridgedErgs);
                console.log('Fetched bridged RSN:', bridgedRsn);
            } catch (error) {
                console.error('Error loading Cardano bridge data:', error);
            }
        };

        const fetchCardanoAddress = async () => {
            try {
                const response = await axios.get(cardanoToErgoBridge, {
                    headers: { project_id: blockfrostApiKey }
                });
                const data = response.data;
                const cardanoBalance = data.amount.find((amount: any) => amount.unit === 'lovelace').quantity / 1000000;

                setCardanoBalance(cardanoBalance);

                console.log('Fetched Cardano Balance:', cardanoBalance);
            } catch (error) {
                console.error('Error loading Cardano address data:', error);
            }
        };

        fetchErgoWatcherCollateral();
        fetchCardanoBridge();
        fetchCardanoAddress();
    }, []);

    return { totalErgs, totalRsn, bridgedErgs, bridgedRsn, cardanoBalance, cardanoTokens };
};

export default useErgoTokens;