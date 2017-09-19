import TodoItem from '../../components/TodoItem'
import React from 'react' 
import renderer from 'react-test-renderer'

describe('TodoList component renders the todo correctly', () => {
	it('renders correctly', () => {
		const todo = {id:1, activo: false, titulo: 'Soy un todo'}
		const rendered = renderer.create(
			<TodoItem {...todo} />
		)
		expect(rendered.toJSON()).toMatchSnapshot();
	})
})