import React, { memo } from 'react'

const Footer = memo(props => {
    const {status, setStatusFilter, numberOfTodos, numberOfTodoLeft, clearCompleted} = props
    
    const FilterBnitem = [{
        title: "All",
        isActive: status === 'All',
        onClick: () =>setStatusFilter('All'),
        link: ''
    },
    {
        title: "Active",
        isActive: status === 'ACTIVE',
        onClick: () =>setStatusFilter('ACTIVE'),
        link: '/active'
    },
    {
        title: "Completed",
        isActive: status === 'COMPLETED',
        onClick: () =>setStatusFilter('COMPLETED'),
        link: '/completed'
    }
]
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{numberOfTodoLeft}</strong>
                <span></span>
                <span> {numberOfTodoLeft <=1 ? 'item': 'items'}</span>
                <span> left</span>
            </span>
            <ul className="filters">
                {
                    FilterBnitem.map( btn => (
                        <FilterBn key={`btn${btn.title}`} {...btn}/>
                    ))
                }
            </ul>
            {numberOfTodos > numberOfTodoLeft && <button onClick={clearCompleted} className="clear-completed">Clear completed</button>}
            
        </footer>
    )
})


const FilterBn = memo(props => {
    const {title, onClick, link, isActive} = props
    return (
        <>
            <li>
                <a 
                    className={`${isActive ? 'selected' : ''}`}
                    href={`#${link}`}
                    onClick = {onClick}
                >
                    {title}
                </a>
            </li>
            <span></span>
        </>
    )
})

export default Footer