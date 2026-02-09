export const pythonAdvancedCourse = {
  id: "python-advanced",
  title: "Advanced Python",
  syllabus: [
    {
      week: 1,
      topics: [
        "Deep dive into iterators and generators",
        "Creating custom iterator classes",
        "Generator functions and `yield` keyword",
      ],
    },
    {
      week: 2,
      topics: [
        "Decorators: function decorators, class decorators",
        "Built-in decorators (`@staticmethod`, `@classmethod`, `@property`)",
        "Writing custom decorators with arguments",
      ],
    },
    {
      week: 3,
      topics: [
        "Context managers and the `with` statement",
        "Implementing custom context managers using `__enter__`/`__exit__`",
        "`contextlib` utilities",
      ],
    },
    {
      week: 4,
      topics: [
        "Metaprogramming: dynamic attributes, `getattr`/`setattr`",
        "Using `type()` to create classes dynamically",
        "Introduction to metaclasses",
      ],
    },
    {
      week: 5,
      topics: [
        "Concurrency vs. parallelism: threads, processes, and async",
        "Threading module basics, GIL implications",
        "Multiprocessing with `multiprocessing` module",
      ],
    },
    {
      week: 6,
      topics: [
        "Asynchronous programming with `asyncio`",
        "Defining and running `async` functions",
        "Tasks, event loops, and `await` keyword",
      ],
    },
    {
      week: 7,
      topics: [
        "Advanced data structures: `collections` module (deque, OrderedDict, defaultdict)",
        "Namedtuples and dataclasses",
        "Using `heapq` and `bisect` modules",
      ],
    },
    {
      week: 8,
      topics: [
        "Python packaging: `setuptools`, `wheel`, and `twine`",
        "Writing `setup.py` and `pyproject.toml`",
        "Publishing a package to PyPI",
      ],
    },
    {
      week: 9,
      topics: [
        "Performance optimization: profiling with `cProfile` and `timeit`",
        "Using `functools.lru_cache` for memoization",
        "C extensions and `ctypes` overview",
      ],
    },
    {
      week: 10,
      topics: [
        "Type hints and static type checking with `mypy`",
        "Creating and using `.pyi` stubs",
        "Best practices for type annotations",
      ],
    },
    {
      week: 11,
      topics: [
        "Testing advanced scenarios: `pytest` fixtures and parametrization",
        "Mocking and patching with `unittest.mock`",
        "Continuous integration basics with GitHub Actions",
      ],
    },
    {
      week: 12,
      topics: [
        "Final capstone: build a complex CLI or web crawler using advanced concepts",
        "Code review, performance tuning, and documentation",
        "Suggested next steps: frameworks, data science, and beyond",
      ],
    },
  ],
};
