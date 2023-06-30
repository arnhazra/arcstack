const endPoints = {
    polygonScanEndpoint: `https://mumbai.polygonscan.com/tx`,
    infuraEndpoint: `https://polygon-mumbai.infura.io/v3/fcb2c26ca13f46a591ed0822c3565c50`,
    requestAuthCodeEndpoint: `/api/user/requestauthcode`,
    verifyAuthCodeEndpoint: `/api/user/verifyauthcode`,
    userDetailsEndpoint: `/api/user/userdetails`,
    signOutEndpoint: `/api/user/signout`,
    subscribeEndpoint: `/api/user/subscribe`,
    unsubscribeEndpoint: `/api/user/unsubscribe`,
    createTransactionEndpoint: `/api/transaction/create`,
    getTransactionsEndpoint: `/api/transaction/gettxbyuser`,
    airlakeFiltersEndpoint: `/api/products/airlake/filters`,
    airlakeFindDatasetsEndpoint: `/api/products/airlake/finddatasets`,
    airlakeViewDatasetsEndpoint: `/api/products/airlake/viewdataset`,
    airlakeFindSimilarDatasetsEndpoint: `/api/products/airlake/findsimilardatasets`,
    airlakeGetDatasetHistoryByUserEndpoint: `/api/products/airlake/getdatasethistorybyuser`,
    airlakeMetadataApiEndpoint: `/api/products/airlake/metadataapi`,
    airlakeDataApiEndpoint: `/api/products/airlake/dataapi`,
    evolakeGenerateQueryEndpint: `/api/products/evolake/generatequery`,
    evolakeGetQueryHistoryEndpoint: `/api/products/evolake/getqueryhistory`,
    icelakeCreateDocEndpoint: `/api/products/icelake/createdoc`,
    icelakeGetAllDocEndpoint: `/api/products/icelake/getalldoc`,
    icelakeSaveDocEndpoint: `/api/products/icelake/savedoc`,
    icelakeDeleteDocEndpoint: `/api/products/icelake/deletedoc`,
    snowlakeCreatePrototypeEndpoint: `/api/products/snowlake/createprototype`,
    snowlakeGetAllPrototypesEndpoint: `/api/products/snowlake/getallprototypes`,
    snowlakeViewPrototypeEndpoint: `/api/products/snowlake/viewprototype`,
    snowlakeDeletePrototypeEndpoint: `/api/products/snowlake/deleteprototype`,
}

export default endPoints