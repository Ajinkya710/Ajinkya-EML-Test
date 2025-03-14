/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Table, Input, Button, DatePicker, Select } from "antd";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { useAppDispatch } from "../../store";
import { selectError, selectIsLoading, selectToDoList } from "./store/selector";
import { getToDoList } from "./store/action";
import moment from "moment";
import {
  CheckCircleTwoTone,
  CloseCircleTwoTone,
  EditTwoTone,
} from "@ant-design/icons";

const { Option } = Select;

const ToDoList = () => {
  const dispatch = useAppDispatch();
  const todos = useSelector(selectToDoList);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const [editingRow, setEditingRow] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<{ [key: string]: string }>({});
  const [editDate, setEditDate] = useState<{ [key: string]: string }>({});
  const [editCompleted, setEditCompleted] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    dispatch(getToDoList());
  }, [dispatch]);

  const handleEditClick = (
    id: string,
    currentTodo: string,
    currentDate: string,
    currentCompleted: number
  ) => {
    setEditingRow(id);
    setEditValue({ ...editValue, [id]: currentTodo });
    setEditDate({ ...editDate, [id]: currentDate });
    setEditCompleted({ ...editCompleted, [id]: currentCompleted });
  };

  const handleSaveClick = (id: string) => {
    console.log("Saving:", id, editValue[id], editDate[id], editCompleted[id]);
    setEditingRow(null);
  };

  const handleChange = (id: string, value: string) => {
    setEditValue({ ...editValue, [id]: value });
  };

  const handleDateChange = (
    id: string,
    date: any,
    dateString: string | string[]
  ) => {
    if (Array.isArray(dateString)) return;
    setEditDate({ ...editDate, [id]: dateString });
  };

  const handleCompletedChange = (id: string, value: number) => {
    setEditCompleted({ ...editCompleted, [id]: value });
  };

  const handleCancelClick = () => {
    setEditingRow(null);
  };

  const columns = [
    {
      title: "No",
      key: "no",
      render: (_: any, __: any, index: number) => `${index + 1}`,
    },
    {
      title: "Todo",
      dataIndex: "todo",
      key: "todo",
      render: (text: string, record: any) =>
        editingRow === record.id ? (
          <Input
            value={editValue[record.id] || ""}
            onChange={(e) => handleChange(record.id, e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: "Due Date",
      dataIndex: "dueDate",
      key: "dueDate",
      render: (text: string, record: any) =>
        editingRow === record.id ? (
          <DatePicker
            value={
              editDate[record.id] ? moment(editDate[record.id]) : moment(text)
            }
            onChange={(date, dateString) =>
              handleDateChange(record.id, date, dateString)
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
      render: (completed: number, record: any) =>
        editingRow === record.id ? (
          <Select
            value={editCompleted[record.id] ?? completed}
            onChange={(value) => handleCompletedChange(record.id, value)}
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
      render: (_: any, record: any) =>
        editingRow === record.id ? (
          <>
            <CloseCircleTwoTone
              style={{ fontSize: 25 }}
              onClick={handleCancelClick}
            />
            <CheckCircleTwoTone
              style={{ fontSize: 25, marginLeft: "1rem" }}
              onClick={() => handleSaveClick(record.id)}
            />
          </>
        ) : (
          <Button
            icon={<EditTwoTone style={{ fontSize: 25 }} />}
            onClick={() =>
              handleEditClick(record.id, record.todo, record.dueDate, record.completed)
            }
          />
        ),
    },
  ];

  return (
    <PageWrapper>
      <HeaderText>Here is your ToDo list:</HeaderText>
      {error && <ErrorText>{error}</ErrorText>}
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
