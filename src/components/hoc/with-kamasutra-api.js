import React from 'react'
import {KamasutraApiConsumer} from "../context/kamasutra-api-context";

const withKamasutraApi = () =>(Wrapped) =>{

    return(props) => {
        return (

            <KamasutraApiConsumer>

                {
                    (services) => {
                        return <Wrapped  {...props} services={services} />
                    }
                }

            </KamasutraApiConsumer>
        )

    }

};
export default withKamasutraApi