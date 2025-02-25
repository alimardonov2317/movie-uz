import { Suspense } from "react";
import loadingImage from "../assets/ZKZg.gif" 

export const Loading = ()=>{
    return <div className="w-full h-screen flex items-center justify-center">
        <img src={loadingImage} className="w-[100px]" alt="" />
    </div>
}

export const SuspenseContainer = ({children}) => {
    return <Suspense fallback={<Loading/>}>{children}</Suspense>
}