//Home Components
import Home from '@/components/Views/Home.vue'


//General Components
import NotFound from '@/components/General/NotFound.vue'

//Export routes based on domain used
const host = window.location.host.toUpperCase()

const routes = () => {
		return [
	    	{path: '/', name: 'dashboard', component: Home},	    	
			{path: '*', component: NotFound}
		]
	
}

export default routes()