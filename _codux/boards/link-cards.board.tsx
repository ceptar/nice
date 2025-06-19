import { createBoard } from '@wixc3/react-board';

export default createBoard({
    name: 'Link Cards',
    Board: () => (
        <div className="cardsSection" data-oid="qsumhuy">
            <a className="linkCard" href="about:blank" data-oid="26oa1rb">
                <img
                    className="linkCardBackground"
                    src="https://static.wixstatic.com/media/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_c05a03f48fbd49e7b5046d1b18c930eb~mv2.jpg"
                    alt=""
                    data-oid="jjs0z6g"
                />

                <div className="linkCardTitle" data-oid="qtp58ui">
                    Kitchen
                </div>
            </a>
            <a className="linkCard" href="about:blank" data-oid="904u4rw">
                <img
                    className="linkCardBackground"
                    src="https://static.wixstatic.com/media/c837a6_269f35d6ccff4321b7ed1e65c2835c61~mv2.jpg/v1/fill/w_548,h_730,q_90/c837a6_269f35d6ccff4321b7ed1e65c2835c61~mv2.jpg"
                    alt=""
                    data-oid="bebnk4q"
                />

                <div className="linkCardTitle" data-oid="vpg9v44">
                    Bath
                </div>
            </a>
            <a className="linkCard" href="about:blank" data-oid="aayjmgu">
                <img
                    className="linkCardBackground"
                    src="https://static.wixstatic.com/media/c837a6_d38d8d08196d477ba49efff880d5b918~mv2.jpg/v1/fill/w_547,h_730,q_90/c837a6_d38d8d08196d477ba49efff880d5b918~mv2.jpg"
                    alt=""
                    data-oid="wrtovjc"
                />

                <div className="linkCardTitle" data-oid="tz-p0y.">
                    On the Go
                </div>
            </a>
        </div>
    ),

    environmentProps: {
        windowWidth: 800,
        windowHeight: 390,
    },
});
