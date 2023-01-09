import Head from "next/head"
import { ListDetail } from "@/modules/list/views"

export default function ListDetailPage() {
    return <>
        <Head>
            <title>Chi tiết link</title>
        </Head>
        <ListDetail />
    </>
}