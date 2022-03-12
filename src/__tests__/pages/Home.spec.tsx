import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';

import { Home } from '../../pages/Home';

describe('Home', () => {
  it('should be able to render new added tasks', () => {
    const { getByPlaceholderText, getByText } = render(<Home />);
    const inputElement = getByPlaceholderText('Add new to.do...');

    expect(getByText('0 tasks'));

    fireEvent.changeText(inputElement, 'First to.do');
    fireEvent(inputElement, 'submitEditing');
    
    expect(getByText('First to.do'));
    expect(getByText('1 task'));

    fireEvent.changeText(inputElement, 'Second to.do');
    fireEvent(inputElement, 'submitEditing');

    expect(getByText('First to.do'));
    expect(getByText('Second to.do'));
    expect(getByText('2 tasks'));
  });

  it('should be able to render tasks as done and undone', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Home />);
    const inputElement = getByPlaceholderText('Add new to.do...');

    fireEvent.changeText(inputElement, 'First to.do');
    fireEvent(inputElement, 'submitEditing');

    const buttonElement = getByTestId('button-0');
    const markerElement = getByTestId('marker-0');
    
    const taskElement = getByText('First to.do');

    expect(buttonElement).toHaveStyle({
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    });
    expect(markerElement).toHaveStyle({
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15
    });
    expect(taskElement).toHaveStyle({
      color: '#666',
    });

    fireEvent.press(taskElement);

    expect(markerElement).toHaveStyle({
      backgroundColor: '#1DB863'
    });
    expect(taskElement).toHaveStyle({
      color: '#1DB863',
      textDecorationLine: 'line-through'
    });
  });

  it('should be able to remove tasks after the trash icon was pressed', async () => {
    const { getByPlaceholderText, getByText, getByTestId, queryByText } = render(<Home />);
    const inputElement = getByPlaceholderText('Add new to.do...');

    fireEvent.changeText(inputElement, 'First to.do');
    fireEvent(inputElement, 'submitEditing');
    
    fireEvent.changeText(inputElement, 'Second to.do');
    fireEvent(inputElement, 'submitEditing');

    const firstTaskTrashIcon = getByTestId('trash-0');

    fireEvent(firstTaskTrashIcon, 'press');

    expect(queryByText('First to.do')).toBeNull();
    expect(getByText('Second to.do'));
    expect(getByText('1 task'));
  });
})