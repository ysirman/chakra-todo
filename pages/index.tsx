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
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import prisma from '../lib/prisma';

type Todo = {
  id: number;
  detail: string;
};

export const getServerSideProps: GetServerSideProps = async () => {
  const initialTodoList = await prisma.todo.findMany();
  return {
    props: { initialTodoList },
  };
};

export const Home: React.FC<{ initialTodoList: Todo[] }> = ({
  initialTodoList,
}) => {
  const router = useRouter();
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.200', 'gray.700');

  const [todoText, setTodoText] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>(initialTodoList);
  const [isError, setIsError] = useState(false);

  const changeTodoText = (inputtedTodo: string) => {
    setTodoText(inputtedTodo);
  };

  const createTodo = async () => {
    if (todoText?.length < 1) return setIsError(true);

    setIsError(false);

    const res = await fetch('/api/todos/create', {
      method: 'POST',
      body: JSON.stringify({ detail: todoText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    if (json.ok) {
      setTodoText('');
      toast({
        title: 'TODOを追加しました！',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      reloadTodoList();
    } else {
      alert(JSON.stringify(json));
    }
  };

  const deleteTodo = async (targetId: number) => {
    const res = await fetch(`/api/todos/${targetId}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    if (json.ok) {
      toast({
        title: 'TODOを削除しました！',
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      reloadTodoList();
    } else {
      alert(JSON.stringify(json));
    }
  };

  const reloadTodoList = async () => {
    const res = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ detail: todoText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const json = await res.json();
    setTodoList(json.todoList);
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
              onChange={(e) => changeTodoText(e.target.value)}
            />
            <FormErrorMessage>やることを入力してください</FormErrorMessage>
          </FormControl>
          <Button colorScheme="teal" mb={3} onClick={createTodo}>
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
                      onClick={() => deleteTodo(todo.id)}
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
};
export default Home;
