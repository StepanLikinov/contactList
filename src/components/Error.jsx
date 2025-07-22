export default function Error({ visible }) {
    return (
        <div className="error-holder">
            <div className={`error ${!visible ? 'hidden' : ''}`}>ERROR</div>
        </div>
    );
}
