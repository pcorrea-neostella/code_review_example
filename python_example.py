from OtherExample import OtherExample
from time import sleep


class Example:

    def __init__(self, example_id: str) -> None:
        self.example_id = example_id
    
    @staticmethod
    def example_print_function():
        msg = 'Hello Example!'
        print(msg)

    def _execute_other_example() -> None:
        o = OtherExample()
        o.sayHello()

    def execute_examples(self) -> None:
        if _long_conditional() and _short_conditional():
            Example.example_print_function()
            Example._execute_other_example()
            example_add_function()


def example_add_function(a: int, b: int) -> None:
    c: int = a + b # Calcula la suma de a y b
    d: int = 10
    print(c - d)

def _short_conditional():
    if 1 == 0:
        return True
    return False

def _long_conditional() -> bool:
    for i in range(1000000):
        sleep(1)
        if i - 100000 > 0:
            return True
    return False
