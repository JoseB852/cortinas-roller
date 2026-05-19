import { useEffect, useContext } from "react";
import Card from "../../views/Card/Card";
import '../ResidencialBody/ResidencialBody.css'
import { StoreContext } from "../Context/StoreContext";
import { FaUserTie, FaHeadset } from "react-icons/fa";


/* =========================
 Icons
========================= */

const iconMap = {

    user:
        <FaUserTie />,

    support:
        <FaHeadset />

};



/* =========================
 Residencial Body
========================= */

export default function ResidencialBody() {

    const { residencialContent, getResidencialContent } = useContext(StoreContext);

    useEffect(() => {
        getResidencialContent();
    }, [
        getResidencialContent
    ]);



    return (

        <>
            <Card />
            <h1 className="text-tiltle"> DISEÑADO EXCLUSIVAMENTE PARA TI</h1>
            <div className="comercial-body">
                {
                    residencialContent.map(
                        (content) => (
                            <div key={content.id}className="body-one">
                                <div className="icon">
                                    {iconMap[content.icon]}
                                </div>
                                <h1>{content.titulo}</h1>
                                <p> {content.text}</p>
                            </div>
                        ))
                }
            </div>
        </>

    )

}