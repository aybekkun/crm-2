import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, InputRef, Space } from 'antd';
import { ColumnType } from 'antd/lib/table';
import { FilterConfirmProps } from 'antd/lib/table/interface';
import { RefObject } from 'react';
import Highlighter from 'react-highlight-words';
import { ITeacherData } from '../../../types/Teachers';

type DataIndex = keyof ITeacherData;

interface ColumnSearchProps {
  dataIndex: DataIndex;
  searchInput: RefObject<InputRef>;
  handleSearch: (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => void;
  handleReset: (clearFilters: () => void) => void;
  setSearchText: (searchText: string) => void;
  setSearchedColumn: (searchText: string) => void;
  searchText: string;
  searchedColumn: string;
}

export const getColumnSearchTeacher = ({
  dataIndex,
  searchInput,
  handleSearch,
  handleReset,
  setSearchText,
  setSearchedColumn,
  searchText,
  searchedColumn,
}: ColumnSearchProps): ColumnType<ITeacherData> => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={searchInput}
        placeholder={`Search ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
        style={{ marginBottom: 8, display: 'block' }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setSearchText((selectedKeys as string[])[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
      </Space>
    </div>
  ),
  filterIcon: (filtered: boolean) => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  ),
  onFilter: (value, record) =>
    record[dataIndex]!.toString()
      .toLowerCase()
      .includes((value as string).toLowerCase()),
  onFilterDropdownVisibleChange: (visible) => {
    if (visible) {
      setTimeout(() => searchInput.current?.select(), 100);
    }
  },
  render: (text) =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    ),
});
