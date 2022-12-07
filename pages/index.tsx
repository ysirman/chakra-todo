import { DeleteIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  IconButton,
  Input,
  Spacer,
  useColorMode,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';

type Todo = {
  id: number;
  detail: string;
};

export default function Home() {
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.200', 'gray.700');

  const [todoText, setTodoText] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isError, setIsError] = useState(false);

  const handleChangeTodoText = (inputtedTodo: string) => {
    setTodoText(inputtedTodo);
  };

  const handleAddTodo = () => {
    if (todoText?.length < 1) return setIsError(true);

    setIsError(false);
    const nextId = todoList.length == 0 ? 1 : todoList.slice(-1)[0].id + 1;
    setTodoList([...todoList, { id: nextId, detail: todoText }]);
    setTodoText('');
    toast({
      title: 'TODOを追加しました！',
      status: 'success',
      duration: 9000,
      isClosable: true,
    });
  };

  const handleDeleteTodo = (targetId: number) => {
    const newTodoList = todoList.filter((todo) => todo.id != targetId);
    setTodoList(newTodoList);
  };

  return (
    <Flex height="100vh" flexDirection="column">
      <Flex m={5}>
        <Box>
          <Heading>TODO LIST</Heading>
        </Box>
        <Spacer />
        <Box>
          {colorMode === 'light' ? (
            <IconButton
              aria-label="暗くする"
              icon={<MoonIcon />}
              onClick={toggleColorMode}
            />
          ) : (
            <IconButton
              aria-label="明るくする"
              icon={<SunIcon />}
              onClick={toggleColorMode}
            />
          )}
        </Box>
      </Flex>
      <Container maxW="800px">
        <Flex
          mb={6}
          direction="column"
          background={formBackground}
          p={12}
          rounded={6}
        >
          <FormControl isInvalid={isError} mb={3}>
            <Input
              placeholder="やること"
              variant="filled"
              type="text"
              value={todoText}
              onChange={(e) => handleChangeTodoText(e.target.value)}
            />
            <FormErrorMessage>やることを入力してください</FormErrorMessage>
          </FormControl>
          <Button colorScheme="teal" mb={3} onClick={handleAddTodo}>
            追加
          </Button>
        </Flex>
        {todoList.length > 0 && (
          <Flex
            direction="column"
            background={formBackground}
            p={12}
            rounded={6}
          >
            <ul>
              {todoList.map((todo) => {
                return (
                  <li key={todo.id}>
                    <Checkbox size="lg">{todo.detail}</Checkbox>
                    <IconButton
                      aria-label="TODO削除"
                      icon={<DeleteIcon />}
                      onClick={() => handleDeleteTodo(todo.id)}
                    />
                  </li>
                );
              })}
            </ul>
          </Flex>
        )}
      </Container>
    </Flex>
  );
}
