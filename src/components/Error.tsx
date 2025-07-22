/**
 * Imports
 */

import { ErrorProps } from '../types/interfaces';

/**
 * Error
 */

export default function Error({ visible }: ErrorProps) {
    return (
        <div className="error-holder">
            <div className={`error ${!visible ? 'hidden' : ''}`}>ERROR</div>
        </div>
    );
}
