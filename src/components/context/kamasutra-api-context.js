import React from 'react'

const {Provider: KamasutraApiProvider, Consumer : KamasutraApiConsumer} = React.createContext({});

export {
    KamasutraApiProvider,
    KamasutraApiConsumer
}