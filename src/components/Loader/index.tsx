import Lottie from 'react-lottie';
import LoaderAnimation from '../../assets/Loader.json';
import { FC } from 'react';

interface Props {
    loading: boolean;
}

const Loader: FC<Props> = ({ loading }) => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderAnimation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    if (!loading) return null;

    return (
        <div
            data-testid='testloader'
            style={{
                zIndex: 99999,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'fixed',
                opacity: '75%',
            }}
        >
            <Lottie options={defaultOptions} width={400} height={400} />
        </div>
    );
};

export default Loader;
