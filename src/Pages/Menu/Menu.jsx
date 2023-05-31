import React from 'react';
import { Helmet} from 'react-helmet-async';
import Cover from '../Shared/Cover/Cover';
import menuImg from'../../assets/menu/banner3.jpg';
import dessertImg from'../../assets/menu/dessert-bg.jpeg';
import pizzaImg from'../../assets/menu/pizza-bg.jpg';
import soupImg from'../../assets/menu/soup-bg.jpg';
import saladImg from'../../assets/menu/salad-bg.jpg';
import useMenu from '../../Hooks/useMenu';
import SectionTitle from '../../Components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategoroy/MenuCategory';
const Menu = () => {
    const [menu]=useMenu();
    const desserts=menu.filter(item=>item.category==='dessert');
    const soup=menu.filter(item=>item.category==='soup');
    const salad=menu.filter(item=>item.category==='salad');
    const pizza=menu.filter(item=>item.category==='pizza');
    const offered=menu.filter(item=>item.category==='offered');
    return (
        <div>
             <Helmet>
               <title>Bistro Boss | Menu</title>
                
           </Helmet>
           <Cover img={menuImg} title="Our Menu"></Cover>
           {/* main cover */}
           <SectionTitle subHeading="Don't Miss" heading="Today's offer"></SectionTitle>
           {/* offered menu items */}
           <MenuCategory items={offered}></MenuCategory>
           {/* dessert menu items */}
           <MenuCategory items={desserts} title="dessert" coverImg={dessertImg}></MenuCategory>
           {/* pizza menu items */}
           <MenuCategory items={pizza} title="pizza" coverImg={pizzaImg}></MenuCategory>
           {/* soup menu items */}
           <MenuCategory items={salad} title="salad" coverImg={saladImg}></MenuCategory>
           <MenuCategory items={soup} title="soup" coverImg={soupImg}></MenuCategory>

        </div>
    );
};

export default Menu;