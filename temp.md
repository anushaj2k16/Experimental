# Task 2

### Creational patterns - Singleton pattern

The singleton pattern is one of the simplest design patterns, it involves only one class which is responsible to instantiate itself.
This pattern is used when there is a need for only one instance across the application (i.e, centralized management of internal
or external resources) providing global point of access to the created instance.
In this case the same instance can be used from everywhere, being impossible to invoke directly the constructor each time.
 Example : Connection to redis database should be done once and same instance has to be accessed throughout the application.
 
 ![alt text]( "Singleton Pattern")
