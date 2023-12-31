import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown, faFilm } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react'
import { Link } from '@inertiajs/react';

const MenuDropDown = ({display,menu}) => {

	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		setToggle(false)
	},[])


	return (
		<>
			<div className="relative w-full">
				<button
					type="button"
					className = "hover:text-white w-full px-4 py-2 flex gap-4 items-center justify-between border-s-4 border-red-600 ps-6"
					onClick = {() => setToggle(prev => !prev)}
				>
                    <div className='flex items-center gap-2'>
                        <FontAwesomeIcon 
                        icon={faFilm} 
                        />
                        <div>
                            {display}
                        </div>
                    </div>
					<FontAwesomeIcon 
						icon={faAngleDown}
					/>
				</button>


				<ul 
				className={`${toggle ? 'h-fit' : "h-[0rem]"} w-full flex flex-col gap-2 overflow-hidden transition-all duration-500  right-0 left-0  px-10`}
				>
					
					{menu.map((item, i) => 
						(
							<li className="w-full" key={item.id}>
								<Link
                                    className='w-full ps-4 text-left hover:text-white border-s-2 border-dashed border-slate-400'
									href={item.link}
								>
									{item.name}
								</Link>
							</li>
						)
					)}
				</ul>
			</div>
		</>
	)
}

export default MenuDropDown;