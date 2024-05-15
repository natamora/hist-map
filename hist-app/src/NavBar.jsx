import { Button, Icon, Menu } from 'semantic-ui-react';

export default function NavBar() {
    return (
        <Menu inverted fixed='top' size='large'>
            {/* <Container> */}
            <Menu.Item>
                <Button icon='align justify'/>
            </Menu.Item>
            <Menu.Item header>
                <Icon name='map' size='big'></Icon>
                Przeglądarka map historycznych
            </Menu.Item>

            {/* </Container> */}
        </Menu>
    )
}