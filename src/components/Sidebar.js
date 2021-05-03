import useUser from '../hooks/useUser';

const Sidebar = () => {

    const { user } = useUser();

    console.log(user)

    return (
        <div>
            Sidebar
        </div>
    )
}

export default Sidebar;