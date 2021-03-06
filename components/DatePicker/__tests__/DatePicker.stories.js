// @flow
import MockDate from '../../internal/MockDate';
import React from 'react';
import { storiesOf, action } from '@storybook/react';
import DatePicker from '../DatePicker';

class DatePickerWithError extends React.Component {
  state: {
    error: boolean,
    value: string | Date | null
  } = {
    value: new Date(),
    error: false
  };

  handleChange = (_, value) => {
    this.setState({ value, error: typeof value === 'string' });
  };

  render() {
    return (
      <DatePicker
        error={this.state.error}
        value={this.state.value}
        onChange={this.handleChange}
        onUnexpectedInput={x => (x.length ? x : null)}
      />
    );
  }
}

storiesOf('DatePicker', module)
  .addDecorator(story =>
    <div>
      <MockDate date={new Date('2017-01-02')} />
      {story()}
    </div>
  )
  .add('with mouseevent handlers', () =>
    <div style={{ paddingTop: 200 }}>
      <DatePicker
        value={new Date('2017-01-02')}
        onMouseEnter={() => console.count('enter')}
        onMouseLeave={() => console.count('leave')}
        onChange={action('change')}
      />
      <button>ok</button>
    </div>
  )
  .add('DatePickerWithError', () => <DatePickerWithError />);
