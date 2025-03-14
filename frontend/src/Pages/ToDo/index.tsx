import { useEffect, useState } from "react";
import { Table, Input, Button, DatePicker, Select, Popconfirm } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "../../store";
import {
  selectError,
  selectIsLoading,
  selectShowAddToDo,
  selectToDoList,
} from "./store/selector";
import { deleteToDo, getToDoList, updateToDo } from "./store/action";
import moment from "moment";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  DeleteTwoTone,
  EditTwoTone,
  PlusCircleTwoTone,
} from "@ant-design/icons";
import AddToDo from "./components/AddToDo";
import { setIsLoading, setShowAddToDo } from "./store/slice";
import { STATUS, TToDo } from "./store/types";
import dayjs from "dayjs";

const { Option } = Select;

const ToDoList = () => {
  const dispatch = useAppDispatch();
  const todos = useSelector(selectToDoList);
  const isLoading = useSelector(selectIsLoading);
  const showAddToDo = useSelector(selectShowAddToDo);
  const error = useSelector(selectError);

  // Local state for editing
  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    todo: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dueDate: any;
    completed: number;
  }>({
    todo: "",
    dueDate: null,
    completed: 0,
  });

  useEffect(() => {
    dispatch(getToDoList());
  }, [dispatch]);

  const handleEditClick = (record: TToDo) => {
    setEditingRow(record.id);
    setEditValues({
      todo: record.todo,
      dueDate: record.dueDate ? dayjs(record.dueDate, "YYYY-MM-DD") : null,
      completed: record.completed,
    });
  };

  const handleSaveClick = async (id: string) => {
    const updatedData = {
      id: String(id),
      data: {
        todo: editValues.todo,
        dueDate: editValues.dueDate
          ? moment(editValues.dueDate).format("YYYY-MM-DD")
          : undefined,
        completed: editValues.completed ?? STATUS.INCOMPLETE,
      },
    };

    dispatch(setIsLoading(true));
    await dispatch(updateToDo(updatedData));
    setEditingRow(null);
    dispatch(getToDoList());
  };

  const handleCancelClick = () => {
    setEditingRow(null);
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_: string, __: TToDo, index: number) => `${index + 1}`,
    },
    {
      title: "Todo",
      dataIndex: "todo",
      key: "todo",
      render: (text: string, record: TToDo) =>
        editingRow === record.id ? (
          <Input
            value={editValues.todo}
            onChange={(e) =>
              setEditValues((prev) => ({
                ...prev,
                todo: e.target.value,
              }))
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text: string, record: TToDo) =>
        editingRow === record.id ? (
          <DatePicker
            value={
              editValues.dueDate
                ? dayjs(editValues.dueDate, "YYYY-MM-DD")
                : null
            }
            onChange={(date) =>
              setEditValues((prev) => ({
                ...prev,
                dueDate: date ? date.format("YYYY-MM-DD") : "",
              }))
            }
          />
        ) : (
          text
        ),
    },
    {
      title: "Is Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed: number, record: TToDo) =>
        editingRow === record.id ? (
          <Select
            value={editValues.completed}
            onChange={(value) =>
              setEditValues((prev) => ({ ...prev, completed: value }))
            }
            style={{ width: 120 }}
          >
            <Option value={0}>No</Option>
            <Option value={1}>Yes</Option>
          </Select>
        ) : completed ? (
          "Yes"
        ) : (
          "No"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: string, record: TToDo) =>
        editingRow === record.id ? (
          <>
            <Button
              loading={isLoading}
              style={{ border: "none" }}
              color="green"
              icon={
                <CheckCircleTwoTone
                  style={{ fontSize: 25 }}
                  twoToneColor="#03b500"
                />
              }
              onClick={async () => {
                handleSaveClick(record.id);
              }}
            />
            <Button
              danger
              style={{ marginLeft: "1rem", border: "none" }}
              icon={
                <CloseCircleTwoTone
                  style={{ fontSize: 25 }}
                  twoToneColor="#e3130b"
                />
              }
              onClick={handleCancelClick}
            />
          </>
        ) : (
          <>
            <Button
              style={{ border: "none" }}
              icon={<EditTwoTone style={{ fontSize: 25 }} />}
              onClick={() => handleEditClick(record)}
            />
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this ToDo?"
              onConfirm={async () => {
                dispatch(setIsLoading(true));
                await dispatch(deleteToDo({ id: record.id }));
                dispatch(getToDoList());
              }}
            >
              <Button
                danger
                style={{ marginLeft: "1rem", border: "none" }}
                icon={
                  <DeleteTwoTone
                    style={{ fontSize: 20 }}
                    twoToneColor="#e3130b"
                  />
                }
              />
            </Popconfirm>
          </>
        ),
    },
  ];

  return (
    <PageWrapper>
      <HeaderContainer>
        <HeaderText>Here is your ToDo list:</HeaderText>
        <Button
          type="primary"
          icon={<PlusCircleTwoTone style={{ fontSize: 16 }} />}
          onClick={() => dispatch(setShowAddToDo(true))}
        >
          Add New
        </Button>
      </HeaderContainer>
      {error && <ErrorText>{error}</ErrorText>}
      {showAddToDo && <AddToDo />}
      <Table
        dataSource={todos}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
        loading={isLoading}
        scroll={{ x: 450 }}
      />
    </PageWrapper>
  );
};

export default ToDoList;

const PageWrapper = styled.div`
  padding: 1rem 4rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const HeaderText = styled.p`
  font-size: 1rem;
  font-weight: 500;
`;

const ErrorText = styled.div`
  display: flex;
  justify-content: center;
  color: red;
  margin: 0 auto;
  font-size: 14px;
`;
