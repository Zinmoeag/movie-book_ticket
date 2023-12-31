import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faAngleDown } from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect} from 'react'
import { Link } from '@inertiajs/react';

const FilterDropDown = ({
	display,
	link,
	query,
	path,
	routeName,
	parameter,
	menu}) => {

	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		setToggle(false)
	},[])

	const makeQuery = (value) => {

		if(query && parameter){
			const data = {};
	
			data[parameter] =  value
	
			return data;
		}

		return {};
	}


	return (
		<>
			<div className="relative text-slate-600 text-sm w-fit">
				<button
					type="button"
					className = " w-40  py-2 flex gap-4 outline-none items-center bg-slate-700 text-white hover:bg-blue-500"
					onClick = {() => setToggle(prev => !prev)}
				>
					<div className='w-32 text-left'>
                        <h3 className='px-2'>
                            {display}
                        </h3>
					</div>

                    <div className='px-2'>
                        <FontAwesomeIcon 
                            icon={faAngleDown}
                        />
                    </div>
				</button>


				<ul className={`${toggle ? 'h-fit' : "h-[0rem]"} bg-white/80 backdrop-blur-sm flex flex-col gap-2 overflow-hidden transition-all duration-500 w-[10rem] absolute left-0 z-20 shadow-lg`}>
					<Link
						href={path ? route(routeName, path) : route(routeName)}
						data =  {parameter && makeQuery('')}
					>
						<li  className="w-full hover:bg-slate-300 px-2 py-2 hover:bg-slate-500 hover:text-white">
							All
						</li>
					</Link>
					{menu && menu.map((item) => {

						return (
                            <Link
								key={item.id}
                                href={path ? route(routeName, path) : route(routeName)}
								data = {parameter ? makeQuery(item.value) : ''}
                            >
                                <li  className="w-full hover:bg-slate-300 px-2 py-2 hover:bg-slate-500 hover:text-white" key={item.id}>
                                        {item.name}
                                </li>
                            </Link>
						)
					}
					)}
				</ul>
			</div>
		</>
	)
}

export default FilterDropDown;
