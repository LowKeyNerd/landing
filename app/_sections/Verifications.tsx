import Heading from "@/components/typography/Heading";
import { Fragment } from "react";

export default function Verifications() {
    const layers = [
        {
            title: "Watcher Observation & Report",
            subtitle: "Individually observing transfer requests and reporting on Ergo",
            description: "Each watcher observes the network individually. They cannot mimic another watcher behaviour to prevent fault cascade",
            icons: [
                <i key="eye" className="uil uil-eye"/>,
                <i key="server" className="uil uil-server-network -rotate-90"/>,
                <i key="search" className="uil uil-search rotate-90"/>,
            ]
        },{
            title: "Watchers Report Aggregation",
            subtitle: "Creating a finalized report if enough distinct reports are available",
            description: "The final report is generated if only if enough watchers have reported the same event. A small set of faulty or malicious watchers cannot generate a final report",
            icons: [
                <i key="file-search" className="uil uil-file-search-alt"/>,
                <i key="eye" className="uil uil-eye -rotate-90"/>,
                <i key="message" className="uil uil-message rotate-90"/>,
            ]
        },{
            title: "Guard Verification",
            subtitle: "Verifying the reported event individually",
            description: "Each guard verifies the events before processing. They won’t rely on others verifying the events to prevent fault cascade",
            icons: [
                <i key="question" className="uil uil-shield-question"/>,
                <i key="file" className="uil uil-file-check-alt -rotate-90"/>,
                <i key="user" className="uil uil-user rotate-90"/>,
            ]
        },{
            title: "Guards Consensus",
            subtitle: "Consensus on a unique payment transaction",
            description: "A guard creates a payment transaction, and all guards should reach agreement on the exact transaction to prevent deadlocks",
            icons: [
                <i key="invoice" className="uil uil-invoice"/>,
                <i key="shield" className="uil uil-shield-check -rotate-90"/>,
                <i key="users" className="uil uil-users-alt rotate-90"/>,
            ]
        },{
            title: "Guards Multiparty Signature",
            subtitle: "Multiparty Signing the agreed upon transaction",
            description: "Each transaction requires the signatures of a quorum of guards. Thus, one or a few potentially malicious guards cannot generate arbitrary transactions",
            icons: [
                <i key="users" className="uil uil-users-alt"/>,
                <i key="file" className="uil uil-file-edit-alt -rotate-90"/>,
                <i key="shield" className="uil uil-shield rotate-90"/>,
            ]
        },{
            title: "Guards Payment",
            subtitle: "Submitting and auditing the final signed payment transaction",
            description: "All events and payments are audited by all guards to prevent double-payment",
            icons: [
                <i key="transaction" className="uil uil-transaction"/>,
                <i key="shield" className="uil uil-shield -rotate-90"/>,
                <i key="check" className="uil uil-check-circle rotate-90"/>,
            ]
        }
    ]
    return (
        <Fragment>
            <Heading title="Rosen Verification Layers"/>
            <div className="block mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {layers.map((item, index) => (
                        <div key={index} className="bg-glass rounded-lg shadow-md p-8 pt-0 relative card-pattern ">
                            <div className="absolute z-10 top-5 text-white text-5xl font-bold px-2">{index+1}</div>
                            <div className="absolute z-10" style={{top: '-5.6rem', right: '7rem'}}>
                                <div className='cube'>
                                    <div className='face front text-2xl'>{item.icons[0]}</div>
                                    <div className='face side text-2xl'>{item.icons[1]}</div>
                                    <div className='face top text-2xl'>{item.icons[2]}</div>
                                </div>
                            </div>
                            <div className="opacity-50 h-20 overflow-hidden">
                                <img src={`/assets/patterns/pat-${index%4+1}.png`} className="h-full max-w-none"/>    
                            </div>
                            <h5 className="text-primary text-md font-bold mt-4">{item.title}</h5>
                            <p className="text-secondary text-sm  mt-2">{item.subtitle}</p>
                            <div className="absolute z-20 w-full h-full rounded-bl-lg rounded-br-lg description text-white top-0 left-0 p-8">
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Fragment>
    )
}