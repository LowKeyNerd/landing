"use client";

import React from "react";
import Button from "../../components/buttons/Button";
import useErgoTokens from '../hooks/getTokens';

export default function Hero() {
    const { totalErgs, totalRsn, bridgedErgs, bridgedRsn, cardanoBalance, cardanoTokens } = useErgoTokens();

    const totalWatchers = totalErgs !== null ? Math.round(totalErgs / 800) : null;

    return (
        <div className="relative">
            <div className="absolute -z-10 w-full h-full">
                <svg viewBox="0 0 160 90" className="blur-2xl opacity-10">
                    <circle cx={40} cy={10} r={40} className="cold" />
                    <circle cx={120} cy={20} r={50} className="hot" />
                </svg>
            </div>
            <div className="block grid grid-cols-1 md:grid-cols-2">
                <div className="col-start-1 md:col-start-2">
                    <img className="lg:scale-125" src="./assets/hero/hero.svg" />
                </div>
                <div className="row-start-2 md:row-start-1 flex flex-col justify-center items-start md:pe-16 lg:pt-16">
                    <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold color-primary leading-normal">
                        <span className="color-accent italic">Rosen Bridge,</span> an open-source protocol for cross-chain asset transfers.
                    </h1>
                    <p className="mt-4 mb-6 text-secondary text-lg lg:text-2xl">
                        - Incentivized Auditing<br />
                        - Ongoing Monitoring<br />
                        - Transparent Reporting
                    </p>
                    <div className="mt-4 mb-6 text-secondary text-lg lg:text-2xl">
                        <h2 className="text-xl lg:text-2xl font-bold">Watcher Amounts</h2>
                        <ul className="list-disc list-inside">
                            {totalErgs !== null ? (
                                <li>Total ERG Locked: {Math.round(totalErgs).toLocaleString()}</li>
                            ) : (
                                <li>Loading ERG...</li>
                            )}
                            {totalRsn !== null ? (
                                <li>Total RSN Locked: {Math.round(totalRsn).toLocaleString()}</li>
                            ) : (
                                <li>Loading RSN...</li>
                            )}
                            {totalWatchers !== null ? (
                                <li>Total Watchers: {totalWatchers.toLocaleString()}</li>
                            ) : (
                                <li>Loading Watchers...</li>
                            )}
                        </ul>
                        <h2 className="text-xl lg:text-2xl font-bold">Bridged Amounts</h2>
                        <ul className="list-disc list-inside">
                            {bridgedErgs !== null ? (
                                <li>ERG Bridged to Cardano: {Math.round(bridgedErgs).toLocaleString()}</li>
                            ) : (
                                <li>Loading ERG Bridged...</li>
                            )}
                            {bridgedRsn !== null ? (
                                <li>RSN Bridged to Cardano: {Math.round(bridgedRsn).toLocaleString()}</li>
                            ) : (
                                <li>Loading RSN Bridged...</li>
                            )}
                            {cardanoBalance !== null ? (
                                <li>ADA Bridged to Ergo: {Math.round(cardanoBalance).toLocaleString()}</li>
                            ) : (
                                <li>Loading ADA Bridged...</li>
                            )}
                        </ul>
                    </div>
                    <Button disabled>Launch App (Soon)</Button>
                </div>
            </div>
        </div>
    );
}
