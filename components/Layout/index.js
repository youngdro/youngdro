import Head from 'next/head'
import layoutStyle from 'styles/index.scss'

export default ({ children, title = 'This is the default title' }) => (
    <div>
        <Head>
            <title>{ title }</title>
            <meta charSet='utf-8' />
            <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            <style dangerouslySetInnerHTML={{__html: layoutStyle}}></style>
        </Head>
        <div className="container">
        { children }
        </div>
        <style jsx global>{`
            html{
                height:100%;
            }
            body{
                height:100%;
                position: relative;
                overflow: hidden;
            }
            .container{
                width: 100%;
                position: absolute;
                height:100%;
                overflow:auto;
                //background-color:#f0edf1;
                background-color:#f4f7f7;
            }
        `}</style>
    </div>
)