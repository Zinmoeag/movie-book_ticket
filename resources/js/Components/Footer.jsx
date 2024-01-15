import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        
        <section className='footer mx-[5rem] mt-20 border-slate-400 border-t-[0.01rem] py-4 pb-10'>
        <div className='flex justify-between'>
            <h3 className='uppercase text-2xl font-bold text-yellow-400'>
                Cinephile
            </h3>
            <div className='flex gap-6'>
                <h3>Follow Us </h3>
                <div className='text-slate-200  rounded-full'>
                    <FontAwesomeIcon 
                    icon={faFacebook}
                    className='text-2xl' 
                    />
                </div>
                <div className='text-slate-200  rounded-full'>
                    <FontAwesomeIcon 
                    icon={faInstagram}
                    className='text-2xl' 
                    />
                </div>
                <div className='text-slate-200 rounded-full'>
                    <FontAwesomeIcon 
                    icon={faXTwitter}
                    className='text-2xl' 
                    />
                </div>
            </div>
        </div>
    </section>
    )
}

export default Footer;