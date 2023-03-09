## 개념

a program in execution

### 문맥 (context)

-   CPU 수행 상태를 나타내는 하드웨어 문맥
    -   Program Counter
    -   각종 register
    -   프로세스가 instruction 어디까지 수행했는가
-   프로세스의 주소 공간
    -   code, data, stack
    -   주소 공간에 어떤 내용이 들어 있는가
-   프로세스 관련 커널 자료 구조
    -   PCB (Process Control Block)
    -   Kernel stack
    -   운영체제는 프로세스가 하나 생길 때마다 PCB 하나 두면서 관리함

프로세스의 현재 문맥을 모르면 다시 CPU 실행 했을 때 어디부터 시작해야 할지 모름

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/02070e05-98bd-4263-95ae-73e9746d8744/Untitled.png)

## 상태 (Process State)

프로세스는 상태(state)가 변경되며 수행된다

-   **Running**
    -   CPU를 잡고 instruction을 수행 중인 상태
-   **Ready**
    -   CPU를 기다리는 상태 (메모리 등 다른 조건은 모두 만족)
-   **Blocked** (wait, sleep)
    -   CPU를 줘도 당장 instruction을 수행할 수 없는 상태
    -   Process 자신이 요청한 event(I/O 등)가 즉시 만족 되지 않아 이를 기다리는 상태
    -   예) 디스크에서 file을 읽어와야 하는 경우
-   New
    -   프로세스가 생성 중인 상태
-   Terminated
    -   수행( execution)이 끝난 상

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f7c56040-f4cb-4df3-b3bf-c20c5b85b146/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/48de75fa-988d-4619-84bd-e5ec72d08cb6/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/e2c5dd99-d77c-4f16-b917-dbc5b2201a2d/Untitled.png)

운영체제 커널은 자신의 Data 영역에 queue 자료구조를 생성, 프로세스 상태를 바꿔가면서 ready 상태인 큐에게 CPU를 주는 방식으로 실행

## Process Control Block (PCB)

운영체제가 각 프로세스를 관리하기 위해 프로세스당 유지하는 정보

### 구성요소 (구조체로 유지)

-   OS가 관리 상 사용하는 정보
    -   Process state, Process ID
    -   scheduling information, priority
-   CPU 수행 관련 하드웨어 값
    -   Program counter, registers
-   메모리 관련
    -   code, data, stack의 위치 정보
-   파일 관련
    -   Open file descriptors

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c4e67672-3996-42a6-8d0c-9e0c1a34cc7b/Untitled.png)

## 문맥 교환 (Context Switch)

-   CPU를 한 프로세스에서 다른 프로세스로 넘겨주는 과정
-   CPU가 다른 프로세스에게 넘어갈 때 운영체제는 다음을 수행
    -   CPU를 내어주는 프로세스의 상태를 그 프로세스의 PCB에 저장
    -   CPU를 새로 얻는 프로세스의 상태를 PCB에서 읽어- 옴

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/392d6577-5b7d-4959-87a3-869c171d04b2/Untitled.png)

-   System call이나 Interrupt 발생 시 반드시 context switch가 일어나는 것은 아님

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a3a2c352-b961-4eaa-bafe-f18978d8d258/Untitled.png)

## 프로세스를 스케줄링하기 위한 큐

-   Job queue
    -   현재 시스템 내 모든 프로세스 집합
-   Ready queue
    -   CPU를 얻고 실행되길 기다리는 현재 메모리 내 프로세스 집합
-   Device queues
    -   I/O device의 처리를 기다리는 프로세스 집합
-   프로세스들은 각 큐를 오가며 수행된다

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d5b77f86-52aa-40ed-9007-8894062da49d/Untitled.png)

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/d7fc07cc-2573-44d1-bb0c-950f8a9c5101/Untitled.png)

## 스케줄러 (Scheduler)

-   Long-term scheduler (장기 스케줄러, job scheduler)
    -   시작 프로세스 중 어떤 것들을 ready queue로 보낼 지 결정
    -   프로세스에 memory(및 각종 자원)을 주는 문제
    -   degree of Multiprogramming을 제어
    -   time sharing system에는 보통 장기 스케줄러가 없음 (무조건 ready)
-   Short-term scheduler (단기 스케줄러, CPU scheduler)
    -   어떤 프로세스를 다음번에 running시킬지 결정
    -   프로세스에 CPU를 주는 문제
    -   충분히 빨라야 함 (millisecond 단위)
-   Medium-Term Scheduler (중기 스케줄러, Swapper)
    -   여유 공간 마련을 위해 프로세스를 통째로 메모리에서 디스크로 쫓아냄
    -   프로세스에게서 memory를 뺏는 문제
    -   degree of Multiprogramming을 제어

## 프로세스의 상태 (Process State)

-   **Running**
    -   CPU를 잡고 instruction을 수행 중인 상태
-   **Ready**
    -   CPU를 기다리는 상태 (메모리 등 다른 조건은 모두 만족)
-   **Blocked** (wait, sleep)
    -   I/O 등의 event를 기다리는 상태
    -   예) 디스크에서 file을 읽어와야 하는 경우
-   **Suspended** (stopped)
    -   외부적인 이유로 프로세스의 수행이 정지된 상태
    -   프로세스는 통째로 디스크에 swap out 된다
    -   예) 사용자가 프로그램을 일시 정지한 경우 (break key)
        -   시스템이 여러 이유로 프로세스를 잠시 중단 시킴 (메모리에 너무 많은 프로세스가 올라와 있을 때)

> Blocked : 자신이 요청한 event가 만족 되면 Ready Suspended : 외부에서 resume해 줘야 Active

![Untitled](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/01a26e38-1142-4f91-9205-cdb4cfeeee55/Untitled.png)

## 출처
https://core.ewha.ac.kr/publicview/C0101020140318134023355997?vmode=f