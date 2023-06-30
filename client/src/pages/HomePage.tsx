import { Container } from 'react-bootstrap'
import { Fragment, useEffect } from 'react'
import { FC } from 'react'
import Constants from '../constants/appConstants'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const HomePage: FC = () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.hasOwnProperty('accessToken')) {
			navigate('/dashboard')
		}
	}, [])

	return (
		<Fragment>
			<Container>
				<div className='cover'>
					<p className='display-5'>
						{Constants.HomeHeader1}<br />
						{Constants.HomeHeader2}<br />
						{Constants.HomeHeader3}
					</p>
					<p className='lead my-4'>
						{Constants.HomeIntro1} <br />
						{Constants.HomeIntro2} <br />
					</p>
					<Link to='/identity' className='btn'>Get Started<i className='fa-solid fa-circle-arrow-right'></i></Link>
				</div>
			</Container>
		</Fragment>
	)
}

export default HomePage