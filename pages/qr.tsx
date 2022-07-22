import Image from 'next/image'
export const Qr = (): JSX.Element => {
    return (
        <>
            <h1>Escanea el código QR</h1>
            <Image src="/chat_boot/qr-code.svg" alt="qr" width={1000} height={1000} />
        </>
    )
}
export default Qr;
