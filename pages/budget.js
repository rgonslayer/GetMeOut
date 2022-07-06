import Graph from "../components/Graph";
import Form from "../components/Form";


export default function budget() {
    return(
        <div className="budget">
            <div className="container mx-auto max-w-6xl text-center drop-shadow">
                <h1 className="text-4xl py-8 mb-10 bg-slate-800 text white rounded"></h1>
                <div className="grid md:grid-cols-2 gap-4">
                    <Graph></Graph>
                    <Form></Form>
                </div>
            </div>
        </div>

    )
}
