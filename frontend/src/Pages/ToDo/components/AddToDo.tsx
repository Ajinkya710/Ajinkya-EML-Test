/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, Select } from "antd";
import { useAppDispatch } from "../../../store";
import { setIsLoading, setShowAddToDo } from "../store/slice";
import { styled } from "styled-components";
import dayjs from "dayjs";
import { addToDo, getToDoList } from "../store/action";
import { STATUS, TToDo } from "../store/types";
import { useSelector } from "react-redux";
import { selectIsLoading } from "../store/selector";

const { Option } = Select;

const AddToDo = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(selectIsLoading);

  const onFinish = async (values: TToDo) => {
    const formattedValues = {
      ...values,
      dueDate: values.dueDate && dayjs(values.dueDate).format("YYYY-MM-DD"),
      completed: values.completed ?? STATUS.INCOMPLETE
    };
    
    dispatch(setIsLoading(true));
    await dispatch(addToDo(formattedValues))
    dispatch(setShowAddToDo(false));
    dispatch(getToDoList());
  };

  return (
    <Form
      name="basic"
      layout="vertical"
      initialValues={{ remember: 0 }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <AddToDoWrapper>
        <Form.Item
          label="Description"
          name="todo"
          rules={[{ required: true, message: "Please input description." }]}
          style={{ width: "50%" }}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Due Date" name="dueDate"
          rules={[{ required: true, message: "Please select date." }]}
          >
          <DatePicker style={{ minWidth: "250px" }} />
        </Form.Item>

        <Form.Item name="completed" label="Completed">
          <Select style={{ minWidth: "250px" }}>
            <Option value={0}>No</Option>
            <Option value={1}>Yes</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            danger
            type="primary"
            onClick={() => {
              dispatch(setShowAddToDo(false));
            }}
          >
            Cancel
          </Button>
        </Form.Item>
      </AddToDoWrapper>
    </Form>
  );
};

export default AddToDo;

const AddToDoWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
`;
