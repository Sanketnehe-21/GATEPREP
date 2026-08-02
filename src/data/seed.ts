// src/data/seed.ts – Full 24-week GATE CS 2027 roadmap
import type { WeekPlan } from '../types';

export const seedWeeks: WeekPlan[] = [
  // ===== PHASE 1: Foundation Core (Weeks 1–4 | Aug 3–30) =====
  {
    weekNumber: 1, startDate: '2026-08-03', endDate: '2026-08-09', phaseId: 1,
    title: 'Digital Logic Foundations',
    missionObjective: 'Master Boolean algebra, K-Map minimization, and Quine-McCluskey method',
    syllabusFocus: ['Boolean Algebra', 'K-Maps', 'Quine-McCluskey'],
    iitMadrasPivots: ['Tabular Quine-McCluskey minimization', 'K-Maps', 'Boolean algebra'],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w1t1', category: 'night_deep_focus', title: 'Boolean Algebra Deep Dive', description: 'Study Boolean theorems, De Morgan, duality, canonical forms (SOP/POS). Work through proofs.', pyqTarget: 15, completed: false },
      { id: 'w1t2', category: 'night_deep_focus', title: 'K-Map Minimization (2,3,4 variables)', description: 'Solve groupings, prime implicants, essential prime implicants. Practice minimizing with don\'t cares.', pyqTarget: 10, completed: false },
      { id: 'w1t3', category: 'office_micro_learning', title: 'Boolean Laws Recall Drill', description: '10-min flashcard drill: Idempotent, Absorption, Complement, De Morgan laws.', completed: false },
      { id: 'w1t4', category: 'office_micro_learning', title: 'K-Map Grouping Quick Practice', description: '15-min: Trace K-map groupings on paper for 3-variable functions.', completed: false },
      { id: 'w1t5', category: 'weekend_war', title: 'GATE PYQ Sprint – Digital Logic', description: 'Solve 50 PYQs on Boolean algebra and K-Maps. Target: complete all, review wrong ones.', pyqTarget: 50, completed: false },
    ]
  },
  {
    weekNumber: 2, startDate: '2026-08-10', endDate: '2026-08-16', phaseId: 1,
    title: 'Quine-McCluskey & Logic Gates',
    missionObjective: 'Complete Quine-McCluskey method and study combinational circuits',
    syllabusFocus: ['Quine-McCluskey', 'Combinational Circuits', 'Multiplexers', 'Decoders'],
    iitMadrasPivots: ['Tabular Quine-McCluskey minimization', 'Combinational circuit design'],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w2t1', category: 'night_deep_focus', title: 'Quine-McCluskey Tabular Method', description: 'Master the step-by-step QM tabular method. Work 5+ examples from scratch.', pyqTarget: 10, completed: false },
      { id: 'w2t2', category: 'night_deep_focus', title: 'Combinational Circuits: Adders, Multiplexers', description: 'Half adder, full adder, ripple carry, carry lookahead, MUX/DEMUX, encoder/decoder.', pyqTarget: 10, completed: false },
      { id: 'w2t3', category: 'office_micro_learning', title: 'QM Tabular Dry Run', description: '15-min: Trace QM steps on paper for a 3-variable function.', completed: false },
      { id: 'w2t4', category: 'office_micro_learning', title: 'Gate Logic Symbol Recall', description: '10-min: Recall AND, OR, NAND, NOR, XOR, XNOR truth tables from memory.', completed: false },
      { id: 'w2t5', category: 'weekend_war', title: 'PYQ Sprint – QM + Combinational', description: '50 PYQs on Quine-McCluskey and combinational circuits.', pyqTarget: 50, completed: false },
    ]
  },
  {
    weekNumber: 3, startDate: '2026-08-17', endDate: '2026-08-23', phaseId: 1,
    title: 'Sequential Circuits & COA Intro',
    missionObjective: 'Master flip-flops, registers, counters and begin COA fundamentals',
    syllabusFocus: ['Flip-flops', 'Registers', 'Counters', 'COA Basics'],
    iitMadrasPivots: ['Hardwired vs Microprogrammed CU'],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w3t1', category: 'night_deep_focus', title: 'Flip-Flops: SR, JK, D, T', description: 'Characteristic equations, excitation tables, state diagrams. Master JK to D conversion.', pyqTarget: 10, completed: false },
      { id: 'w3t2', category: 'night_deep_focus', title: 'COA: CPU Architecture, ISA', description: 'Instruction formats, addressing modes, RISC vs CISC, von Neumann architecture.', pyqTarget: 10, completed: false },
      { id: 'w3t3', category: 'office_micro_learning', title: 'Flip-flop Excitation Tables', description: '10-min: Recall SR, JK, D, T excitation tables. Draw next-state logic.', completed: false },
      { id: 'w3t4', category: 'office_micro_learning', title: 'Addressing Mode Quick Recall', description: '15-min: List all addressing modes with examples on paper.', completed: false },
      { id: 'w3t5', category: 'weekend_war', title: 'PYQ Sprint – Sequential + COA', description: '50 PYQs across sequential circuits and COA basics.', pyqTarget: 50, completed: false },
    ]
  },
  {
    weekNumber: 4, startDate: '2026-08-24', endDate: '2026-08-30', phaseId: 1,
    title: 'Control Unit + Cache Memory',
    missionObjective: 'Hardwired vs Microprogrammed CU, Cache mapping and performance',
    syllabusFocus: ['Control Unit Design', 'Cache Memory', 'Memory Hierarchy'],
    iitMadrasPivots: ['Hardwired vs Microprogrammed Control Unit design', 'Cache Memory Mapping & Performance formulas'],
    deprioritizedTopics: ['Generic secondary/main storage listings'],
    tasks: [
      { id: 'w4t1', category: 'night_deep_focus', title: 'Hardwired vs Microprogrammed CU', description: 'Design trade-offs, hardwired logic diagram, micro-operations, control signals. Master both approaches.', pyqTarget: 10, completed: false },
      { id: 'w4t2', category: 'night_deep_focus', title: 'Cache Memory: Direct, Set-Associative, Fully-Assoc', description: 'Mapping policies, replacement policies (LRU, FIFO, Random), hit/miss rate formulas, AMAT calculation.', pyqTarget: 15, completed: false },
      { id: 'w4t3', category: 'office_micro_learning', title: 'AMAT Formula Drill', description: '10-min: Practice AMAT = Hit time + Miss rate × Miss penalty. Solve 3 problems.', completed: false },
      { id: 'w4t4', category: 'office_micro_learning', title: 'CU Design Recall', description: '15-min: Sketch hardwired CU block diagram from memory.', completed: false },
      { id: 'w4t5', category: 'weekend_war', title: 'Phase 1 Mega PYQ Sprint', description: '80 PYQs covering entire Phase 1 — Digital Logic + COA. Target: 70%+ accuracy.', pyqTarget: 80, completed: false },
    ]
  },

  // ===== PHASE 2: Programming & Theoretical Core (Weeks 5–12 | Aug 31–Oct 25) =====
  {
    weekNumber: 5, startDate: '2026-08-31', endDate: '2026-09-06', phaseId: 2,
    title: 'Pipelining & TOC Intro',
    missionObjective: 'Master pipelining hazards, throughput and begin Theory of Computation',
    syllabusFocus: ['Pipelining', 'Hazards', 'TOC: DFA/NFA'],
    iitMadrasPivots: ['Pipelining Hazards & Throughput'],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w5t1', category: 'night_deep_focus', title: 'Pipelining: Stages, Hazards, Forwarding', description: 'Data hazards, control hazards, structural hazards, stall cycles, speedup formula, throughput calculation.', pyqTarget: 15, completed: false },
      { id: 'w5t2', category: 'night_deep_focus', title: 'TOC: DFA, NFA, ε-NFA, Conversion', description: 'DFA design, NFA to DFA conversion, minimization of DFA, language recognition.', pyqTarget: 10, completed: false },
      { id: 'w5t3', category: 'office_micro_learning', title: 'Pipeline Speedup Formula Recall', description: '10-min: Speedup = n*k / (k + n - 1). Solve 2 numerical on paper.', completed: false },
      { id: 'w5t4', category: 'office_micro_learning', title: 'DFA State Diagram Tracing', description: '15-min: Trace given DFA inputs, determine accept/reject.', completed: false },
      { id: 'w5t5', category: 'weekend_war', title: 'PYQ Sprint – Pipelining + TOC', description: '60 PYQs on pipelining and DFA/NFA theory.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 6, startDate: '2026-09-07', endDate: '2026-09-13', phaseId: 2,
    title: 'Regular Languages & Grammar',
    missionObjective: 'Regular expressions, regular grammars, pumping lemma, CFG',
    syllabusFocus: ['Regular Expressions', 'Pumping Lemma', 'CFG', 'PDA'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w6t1', category: 'night_deep_focus', title: 'Regular Expressions & Regular Grammars', description: 'RE to FA conversion, FA to RE (Arden\'s theorem), closure properties of regular languages.', pyqTarget: 10, completed: false },
      { id: 'w6t2', category: 'night_deep_focus', title: 'Pumping Lemma + CFG Basics', description: 'Pumping lemma proof technique, context-free grammars, parse trees, ambiguity, CNF, GNF.', pyqTarget: 10, completed: false },
      { id: 'w6t3', category: 'office_micro_learning', title: 'Pumping Lemma Recall', description: '10-min: State pumping lemma formally. Trace one proof by contradiction.', completed: false },
      { id: 'w6t4', category: 'office_micro_learning', title: 'CFG Rule Tracing', description: '15-min: Derive strings from given CFG, draw parse trees.', completed: false },
      { id: 'w6t5', category: 'weekend_war', title: 'PYQ Sprint – RE + CFG + Pumping Lemma', description: '60 PYQs on regular expressions, CFGs, and pumping lemma.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 7, startDate: '2026-09-14', endDate: '2026-09-20', phaseId: 2,
    title: 'Turing Machines & Decidability',
    missionObjective: 'TM design, decidability, reducibility, and complexity classes',
    syllabusFocus: ['Turing Machines', 'Decidability', 'P vs NP', 'Complexity'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w7t1', category: 'night_deep_focus', title: 'Turing Machines: Design & Variants', description: 'TM definition, computation, multi-tape TM, non-deterministic TM, TM as language recognizer.', pyqTarget: 10, completed: false },
      { id: 'w7t2', category: 'night_deep_focus', title: 'Decidability + P vs NP', description: 'Decidable/undecidable problems, halting problem, reducibility, NP-hard, NP-complete (Cook\'s theorem).', pyqTarget: 10, completed: false },
      { id: 'w7t3', category: 'office_micro_learning', title: 'Halting Problem Recall', description: '10-min: Explain halting problem undecidability by diagonalization.', completed: false },
      { id: 'w7t4', category: 'office_micro_learning', title: 'NP-Complete Problem List', description: '15-min: List 10 NP-complete problems and their reduction chain.', completed: false },
      { id: 'w7t5', category: 'weekend_war', title: 'PYQ Sprint – TM + Decidability', description: '60 PYQs on Turing machines and decidability.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 8, startDate: '2026-09-21', endDate: '2026-09-27', phaseId: 2,
    title: 'Algorithms: Sorting & Searching',
    missionObjective: 'Asymptotic analysis, sorting algorithms, and searching techniques',
    syllabusFocus: ['Asymptotic Analysis', 'Sorting', 'Searching', 'Recurrences'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w8t1', category: 'night_deep_focus', title: 'Asymptotic Analysis + Recurrences', description: 'Big-O, Theta, Omega, Master theorem, substitution method, recurrence trees.', pyqTarget: 10, completed: false },
      { id: 'w8t2', category: 'night_deep_focus', title: 'Sorting Algorithms Deep Dive', description: 'Merge sort, quick sort, heap sort, radix sort, counting sort — time/space complexities, stability.', pyqTarget: 15, completed: false },
      { id: 'w8t3', category: 'office_micro_learning', title: 'Master Theorem Quick Recall', description: '10-min: State all 3 cases of Master theorem. Solve T(n)=2T(n/2)+n.', completed: false },
      { id: 'w8t4', category: 'office_micro_learning', title: 'Sorting Stability Recall', description: '15-min: Which sorts are stable? Why? Trace merge sort on 5 elements.', completed: false },
      { id: 'w8t5', category: 'weekend_war', title: 'PYQ Sprint – Algorithms I', description: '60 PYQs on analysis, sorting, searching.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 9, startDate: '2026-09-28', endDate: '2026-10-04', phaseId: 2,
    title: 'Graph Algorithms',
    missionObjective: 'BFS, DFS, shortest paths, spanning trees, topological sort',
    syllabusFocus: ['Graph Algorithms', 'BFS/DFS', 'Shortest Paths', 'MST'],
    iitMadrasPivots: [],
    deprioritizedTopics: ['Standalone Shortest Path algorithms (only in context of networks)'],
    tasks: [
      { id: 'w9t1', category: 'night_deep_focus', title: 'BFS, DFS, Topological Sort', description: 'BFS/DFS traversal, complexity, applications (cycle detection, connected components, topo sort).', pyqTarget: 10, completed: false },
      { id: 'w9t2', category: 'night_deep_focus', title: 'Shortest Path + MST', description: 'Dijkstra, Bellman-Ford (negative weights), Floyd-Warshall, Prim\'s, Kruskal\'s — correctness proofs.', pyqTarget: 15, completed: false },
      { id: 'w9t3', category: 'office_micro_learning', title: 'Dijkstra Trace', description: '15-min: Trace Dijkstra on a 5-node weighted graph from memory.', completed: false },
      { id: 'w9t4', category: 'office_micro_learning', title: 'MST Properties Recall', description: '10-min: State cut property, cycle property for MST.', completed: false },
      { id: 'w9t5', category: 'weekend_war', title: 'PYQ Sprint – Graph Algorithms', description: '60 PYQs on graph traversal, shortest paths, MST.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 10, startDate: '2026-10-05', endDate: '2026-10-11', phaseId: 2,
    title: 'Dynamic Programming & Greedy',
    missionObjective: 'Optimal substructure, DP patterns, greedy correctness',
    syllabusFocus: ['Dynamic Programming', 'Greedy Algorithms', 'Divide & Conquer'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w10t1', category: 'night_deep_focus', title: 'DP: 0/1 Knapsack, LCS, LIS, Matrix Chain', description: 'State definition, recurrence, memoization vs tabulation. Solve all classic DP problems.', pyqTarget: 15, completed: false },
      { id: 'w10t2', category: 'night_deep_focus', title: 'Greedy: Activity Selection, Huffman, Fractional Knapsack', description: 'Greedy choice property, exchange argument proof. Huffman encoding tree construction.', pyqTarget: 10, completed: false },
      { id: 'w10t3', category: 'office_micro_learning', title: 'LCS Recurrence Trace', description: '15-min: Trace LCS DP table for "ABCBDAB" and "BDCAB".', completed: false },
      { id: 'w10t4', category: 'office_micro_learning', title: 'Huffman Tree Building', description: '10-min: Build Huffman tree from scratch for 5 characters with given frequencies.', completed: false },
      { id: 'w10t5', category: 'weekend_war', title: 'PYQ Sprint – DP + Greedy', description: '60 PYQs on dynamic programming and greedy algorithms.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 11, startDate: '2026-10-12', endDate: '2026-10-18', phaseId: 2,
    title: 'Data Structures: Trees & Heaps',
    missionObjective: 'BST, AVL, B-trees, heaps, hash tables',
    syllabusFocus: ['BST', 'AVL Trees', 'B-Trees', 'Heaps', 'Hashing'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w11t1', category: 'night_deep_focus', title: 'BST, AVL Trees, Red-Black Trees', description: 'BST operations, AVL rotations (LL/LR/RL/RR), height analysis, amortized complexity.', pyqTarget: 15, completed: false },
      { id: 'w11t2', category: 'night_deep_focus', title: 'Heaps + Hashing', description: 'Min/max heap, heapify, heap sort, hash functions, collision: chaining vs open addressing, load factor.', pyqTarget: 10, completed: false },
      { id: 'w11t3', category: 'office_micro_learning', title: 'AVL Rotation Trace', description: '15-min: Insert 5 keys into AVL and perform rotations on paper.', completed: false },
      { id: 'w11t4', category: 'office_micro_learning', title: 'Hash Collision Recall', description: '10-min: Explain linear probing, quadratic probing, double hashing with examples.', completed: false },
      { id: 'w11t5', category: 'weekend_war', title: 'PYQ Sprint – DS Trees + Hashing', description: '60 PYQs on trees, heaps, and hashing.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 12, startDate: '2026-10-19', endDate: '2026-10-25', phaseId: 2,
    title: 'Discrete Math + Phase 2 Consolidation',
    missionObjective: 'Combinatorics, graph theory, mathematical logic, Phase 2 review',
    syllabusFocus: ['Combinatorics', 'Graph Theory', 'Mathematical Logic', 'Set Theory'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w12t1', category: 'night_deep_focus', title: 'Combinatorics + Graph Theory', description: 'Permutations, combinations, pigeonhole, inclusion-exclusion, Euler circuits, planar graphs.', pyqTarget: 10, completed: false },
      { id: 'w12t2', category: 'night_deep_focus', title: 'Mathematical Logic + Set Theory', description: 'Propositional logic, predicate logic, normal forms (CNF/DNF), relations, functions, partial orders.', pyqTarget: 10, completed: false },
      { id: 'w12t3', category: 'office_micro_learning', title: 'Inclusion-Exclusion Recall', description: '10-min: Apply inclusion-exclusion to a 3-set problem.', completed: false },
      { id: 'w12t4', category: 'office_micro_learning', title: 'Predicate Logic Formulas', description: '15-min: Convert English statements to predicate logic notation.', completed: false },
      { id: 'w12t5', category: 'weekend_war', title: 'Phase 2 Mega PYQ Sprint', description: '80 PYQs covering all Phase 2 topics — Algorithms + DS + TOC + Discrete Math.', pyqTarget: 80, completed: false },
    ]
  },

  // ===== PHASE 3: Systems Architecture Core (Weeks 13–20 | Oct 26–Dec 20) =====
  {
    weekNumber: 13, startDate: '2026-10-26', endDate: '2026-11-01', phaseId: 3,
    title: 'OS: Processes & Scheduling',
    missionObjective: 'Process management, CPU scheduling algorithms, synchronization',
    syllabusFocus: ['OS: Processes', 'CPU Scheduling', 'Synchronization'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w13t1', category: 'night_deep_focus', title: 'Processes, Threads, PCB, Context Switch', description: 'Process states, PCB structure, threads vs processes, context switching overhead.', pyqTarget: 10, completed: false },
      { id: 'w13t2', category: 'night_deep_focus', title: 'CPU Scheduling: FCFS, SJF, SRTF, RR, Priority', description: 'Gantt charts, turnaround time, waiting time, response time calculations for all algorithms.', pyqTarget: 15, completed: false },
      { id: 'w13t3', category: 'office_micro_learning', title: 'Scheduling Gantt Chart Trace', description: '15-min: Draw Gantt chart for 4 processes using SJF and RR (q=2).', completed: false },
      { id: 'w13t4', category: 'office_micro_learning', title: 'Process State Diagram Recall', description: '10-min: Draw complete process state transition diagram from memory.', completed: false },
      { id: 'w13t5', category: 'weekend_war', title: 'PYQ Sprint – OS Processes + Scheduling', description: '60 PYQs on processes and CPU scheduling.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 14, startDate: '2026-11-02', endDate: '2026-11-08', phaseId: 3,
    title: 'OS: Synchronization & Deadlock',
    missionObjective: 'Mutex, semaphores, deadlock detection, Banker\'s algorithm',
    syllabusFocus: ['Semaphores', 'Mutex', 'Deadlock', "Banker's Algorithm"],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w14t1', category: 'night_deep_focus', title: 'Critical Section + Semaphores', description: 'Peterson\'s solution, semaphore operations, producer-consumer, readers-writers, dining philosophers.', pyqTarget: 10, completed: false },
      { id: 'w14t2', category: 'night_deep_focus', title: 'Deadlock: Conditions, Detection, Banker\'s', description: 'Coffman conditions, resource allocation graph, Banker\'s algorithm (safety + resource request).', pyqTarget: 15, completed: false },
      { id: 'w14t3', category: 'office_micro_learning', title: "Banker's Algorithm Trace", description: '15-min: Run safety algorithm on a 3-process, 3-resource example.', completed: false },
      { id: 'w14t4', category: 'office_micro_learning', title: 'Semaphore Solution Recall', description: '10-min: Write semaphore solution for producer-consumer from memory.', completed: false },
      { id: 'w14t5', category: 'weekend_war', title: 'PYQ Sprint – Sync + Deadlock', description: '60 PYQs on synchronization and deadlock.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 15, startDate: '2026-11-09', endDate: '2026-11-15', phaseId: 3,
    title: 'OS: Memory Management',
    missionObjective: 'Paging, segmentation, virtual memory, page replacement policies',
    syllabusFocus: ['Paging', 'Segmentation', 'Virtual Memory', 'Page Replacement'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w15t1', category: 'night_deep_focus', title: 'Paging: TLB, Page Tables, Address Translation', description: 'Logical to physical address, multilevel page tables, TLB hit/miss, EAT calculation.', pyqTarget: 15, completed: false },
      { id: 'w15t2', category: 'night_deep_focus', title: 'Page Replacement: FIFO, LRU, Optimal', description: 'Page fault calculations, Belady\'s anomaly, LRU approximations, working set model.', pyqTarget: 15, completed: false },
      { id: 'w15t3', category: 'office_micro_learning', title: 'Page Fault Count Trace', description: '15-min: Count page faults for reference string using FIFO and LRU.', completed: false },
      { id: 'w15t4', category: 'office_micro_learning', title: 'EAT Formula Drill', description: '10-min: EAT = h × TLB_time + (1-h) × (TLB + mem). Solve 2 problems.', completed: false },
      { id: 'w15t5', category: 'weekend_war', title: 'PYQ Sprint – Memory Management', description: '60 PYQs on paging, TLB, page replacement.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 16, startDate: '2026-11-16', endDate: '2026-11-22', phaseId: 3,
    title: 'OS: File Systems + Disk Scheduling',
    missionObjective: 'File system internals, inode, disk scheduling algorithms',
    syllabusFocus: ['File Systems', 'Inodes', 'Disk Scheduling'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w16t1', category: 'night_deep_focus', title: 'File Systems: FAT, Inode, Allocation', description: 'Contiguous, linked, indexed allocation; inode structure, directory structure, file operations.', pyqTarget: 10, completed: false },
      { id: 'w16t2', category: 'night_deep_focus', title: 'Disk Scheduling: FCFS, SSTF, SCAN, C-SCAN', description: 'Head movement calculations, seek time, rotational latency, throughput for each algorithm.', pyqTarget: 10, completed: false },
      { id: 'w16t3', category: 'office_micro_learning', title: 'Disk Scheduling Trace', description: '15-min: Calculate total head movement for SSTF and SCAN on given request queue.', completed: false },
      { id: 'w16t4', category: 'office_micro_learning', title: 'Inode Structure Recall', description: '10-min: Draw inode structure with direct/indirect/double-indirect blocks.', completed: false },
      { id: 'w16t5', category: 'weekend_war', title: 'PYQ Sprint – File Systems + Disk', description: '60 PYQs on file systems and disk scheduling.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 17, startDate: '2026-11-23', endDate: '2026-11-29', phaseId: 3,
    title: 'Computer Networks: Physical to Transport',
    missionObjective: 'OSI/TCP model, IP addressing, CIDR, NAT, IPv4 fragmentation',
    syllabusFocus: ['OSI Model', 'IPv4', 'CIDR', 'NAT', 'Fragmentation'],
    iitMadrasPivots: ['IPv4 Fragmentation', 'CIDR', 'NAT'],
    deprioritizedTopics: ['UDP basics', 'ARP', 'DHCP', 'ICMP'],
    tasks: [
      { id: 'w17t1', category: 'night_deep_focus', title: 'IPv4: Addressing, Subnetting, CIDR', description: 'IP address classes, subnetting, CIDR notation, VLSM, supernetting. Calculate network/host ranges.', pyqTarget: 15, completed: false },
      { id: 'w17t2', category: 'night_deep_focus', title: 'IPv4 Fragmentation + NAT', description: 'Fragmentation fields (ID, flag, offset), MTU, reassembly. NAT: SNAT, DNAT, PAT operation.', pyqTarget: 10, completed: false },
      { id: 'w17t3', category: 'office_micro_learning', title: 'CIDR Subnetting Quick Drill', description: '15-min: Given 192.168.1.0/25, calculate usable hosts, broadcast, subnet mask.', completed: false },
      { id: 'w17t4', category: 'office_micro_learning', title: 'IP Header Fields Recall', description: '10-min: List all IPv4 header fields and their sizes from memory.', completed: false },
      { id: 'w17t5', category: 'weekend_war', title: 'PYQ Sprint – Networks I: IP + Addressing', description: '60 PYQs on IP addressing, CIDR, subnetting, fragmentation.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 18, startDate: '2026-11-30', endDate: '2026-12-06', phaseId: 3,
    title: 'Networks: Routing Protocols',
    missionObjective: 'Distance-vector (RIP/Bellman-Ford), Link-state (OSPF/Dijkstra) routing',
    syllabusFocus: ['Distance-Vector Routing', 'Link-State Routing', 'RIP', 'OSPF'],
    iitMadrasPivots: ['Distance-Vector & Link-State routing'],
    deprioritizedTopics: ['Flooding', 'Standalone Shortest Path algorithms'],
    tasks: [
      { id: 'w18t1', category: 'night_deep_focus', title: 'Distance-Vector Routing (Bellman-Ford)', description: 'RIP protocol, routing table updates, count-to-infinity problem, split horizon, poison reverse.', pyqTarget: 15, completed: false },
      { id: 'w18t2', category: 'night_deep_focus', title: 'Link-State Routing (Dijkstra/OSPF)', description: 'LSP flooding (conceptual), link-state database, SPF computation, OSPF areas.', pyqTarget: 10, completed: false },
      { id: 'w18t3', category: 'office_micro_learning', title: 'Bellman-Ford Table Update Trace', description: '15-min: Run Bellman-Ford routing table update for 3-node network.', completed: false },
      { id: 'w18t4', category: 'office_micro_learning', title: 'Distance-Vector vs Link-State Comparison', description: '10-min: List 5 key differences between DV and LS routing on paper.', completed: false },
      { id: 'w18t5', category: 'weekend_war', title: 'PYQ Sprint – Routing Protocols', description: '60 PYQs on routing: DV, LS, subnetting, and related concepts.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 19, startDate: '2026-12-07', endDate: '2026-12-13', phaseId: 3,
    title: 'TCP: Flow & Congestion Control',
    missionObjective: 'TCP connection, flow control (sliding window), congestion control (AIMD)',
    syllabusFocus: ['TCP', 'Flow Control', 'Congestion Control', 'Socket API'],
    iitMadrasPivots: ['TCP flow & congestion control', 'Socket API'],
    deprioritizedTopics: ['SMTP', 'FTP', 'Email protocols'],
    tasks: [
      { id: 'w19t1', category: 'night_deep_focus', title: 'TCP: 3-Way Handshake, Sequence Numbers', description: 'SYN/SYN-ACK/ACK, sequence/acknowledgment numbers, connection teardown (4-way), TIME_WAIT.', pyqTarget: 10, completed: false },
      { id: 'w19t2', category: 'night_deep_focus', title: 'TCP Flow Control + Congestion Control', description: 'Sliding window, receiver window (rwnd), slow start, congestion avoidance, AIMD, fast retransmit, ssthresh.', pyqTarget: 15, completed: false },
      { id: 'w19t3', category: 'office_micro_learning', title: 'TCP Window Size Calculation', description: '15-min: Given window size W and RTT, calculate effective bandwidth (W/RTT).', completed: false },
      { id: 'w19t4', category: 'office_micro_learning', title: 'Slow Start / AIMD Trace', description: '10-min: Trace TCP congestion window growth (ssthresh=8, timeout at cwnd=12).', completed: false },
      { id: 'w19t5', category: 'weekend_war', title: 'PYQ Sprint – TCP + Transport Layer', description: '60 PYQs on TCP, sliding window, congestion control.', pyqTarget: 60, completed: false },
    ]
  },
  {
    weekNumber: 20, startDate: '2026-12-14', endDate: '2026-12-20', phaseId: 3,
    title: 'DNS, HTTP + Phase 3 Consolidation',
    missionObjective: 'DNS resolution, HTTP/HTTPS, application layer, full Phase 3 review',
    syllabusFocus: ['DNS', 'HTTP', 'Application Layer', 'Phase 3 Review'],
    iitMadrasPivots: ['DNS', 'HTTP'],
    deprioritizedTopics: ['SMTP', 'FTP', 'Email'],
    tasks: [
      { id: 'w20t1', category: 'night_deep_focus', title: 'DNS: Hierarchy, Resolution, Record Types', description: 'Root/TLD/authoritative servers, recursive vs iterative resolution, A/AAAA/MX/CNAME/NS records.', pyqTarget: 10, completed: false },
      { id: 'w20t2', category: 'night_deep_focus', title: 'HTTP: Methods, Status Codes, HTTP/2', description: 'GET/POST/PUT/DELETE, persistent connections, pipelining, HTTP/2 features, HTTPS/TLS handshake.', pyqTarget: 10, completed: false },
      { id: 'w20t3', category: 'office_micro_learning', title: 'DNS Resolution Trace', description: '15-min: Trace DNS resolution for "www.example.com" step-by-step.', completed: false },
      { id: 'w20t4', category: 'office_micro_learning', title: 'HTTP Status Codes Recall', description: '10-min: Recall all 2xx, 3xx, 4xx, 5xx status code categories with 2 examples each.', completed: false },
      { id: 'w20t5', category: 'weekend_war', title: 'Phase 3 Mega PYQ Sprint', description: '80 PYQs covering entire Phase 3 — OS + Networks. Target: 70%+ accuracy.', pyqTarget: 80, completed: false },
    ]
  },

  // ===== PHASE 4: Consolidation & Mock Marathon (Weeks 21–24 | Dec 21–Feb 2027) =====
  {
    weekNumber: 21, startDate: '2026-12-21', endDate: '2026-12-27', phaseId: 4,
    title: 'Full Mock Test Marathon I',
    missionObjective: 'Attempt 2 full GATE mocks, analyse weaknesses, target NAT questions',
    syllabusFocus: ['All Subjects', 'Mock Tests', 'NAT Practice'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w21t1', category: 'night_deep_focus', title: 'Full Mock Test #1 + Detailed Analysis', description: 'Attempt full 65-question GATE mock (3 hours). Analyse every wrong/skipped answer. Note weak areas.', completed: false },
      { id: 'w21t2', category: 'night_deep_focus', title: 'Weak Area Deep Rectification', description: 'Based on Mock #1 analysis, revise 2-3 weakest topics with focused problem solving.', completed: false },
      { id: 'w21t3', category: 'office_micro_learning', title: 'NAT Formula Recall Sprint', description: '15-min: Practice numerical answer-type formulas — pipeline, cache, TCP window, AMAT.', completed: false },
      { id: 'w21t4', category: 'weekend_war', title: 'Full Mock Test #2 + PYQ NAT Session', description: 'Mock test #2 + 50 focused NAT-type PYQs. Target: improve score from Mock #1.', pyqTarget: 50, completed: false },
    ]
  },
  {
    weekNumber: 22, startDate: '2026-12-28', endDate: '2027-01-03', phaseId: 4,
    title: 'Full Mock Test Marathon II',
    missionObjective: 'High-velocity mock tests, subject-wise revision, formula consolidation',
    syllabusFocus: ['All Subjects', 'Mock Tests', 'Weak Area Revision'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w22t1', category: 'night_deep_focus', title: 'Full Mock Test #3 + #4 + Analysis', description: 'Two full mocks with deep analysis. Track score trend. Identify recurring mistake patterns.', completed: false },
      { id: 'w22t2', category: 'night_deep_focus', title: 'Formula Sheet Creation', description: 'Create a personal formula cheat-sheet for all numerical topics: pipeline, cache, TCP, scheduling, AMAT.', completed: false },
      { id: 'w22t3', category: 'office_micro_learning', title: 'Subject-wise Score Tracker Review', description: '10-min: Review subject-wise mock performance, prioritise low-scoring areas.', completed: false },
      { id: 'w22t4', category: 'weekend_war', title: 'Weekend: 80 PYQs + Mock #5', description: '80 PYQs from weak subjects + Full Mock #5. Aim for 65%+ score.', pyqTarget: 80, completed: false },
    ]
  },
  {
    weekNumber: 23, startDate: '2027-01-04', endDate: '2027-01-10', phaseId: 4,
    title: 'Final Revision Sprint',
    missionObjective: 'Formula revision, high-yield topic blitz, PYQ pattern analysis',
    syllabusFocus: ['All Subjects', 'High-Yield Topics', 'PYQ Pattern Analysis'],
    iitMadrasPivots: ['Digital Logic', 'COA', 'Computer Networks'],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w23t1', category: 'night_deep_focus', title: 'High-Yield Pivot Topic Blitz', description: 'Focused revision of all IIT Madras pivot topics: QM, K-Maps, CU Design, Cache, Pipelining, Routing, TCP.', completed: false },
      { id: 'w23t2', category: 'night_deep_focus', title: 'Last 5 Years PYQ Pattern Analysis', description: 'Analyse 2020-2024 GATE CS papers for topic frequency, mark distribution, and question style.', pyqTarget: 50, completed: false },
      { id: 'w23t3', category: 'office_micro_learning', title: 'Formula Sheet Recall Test', description: '15-min: Cover formula sheet, try to recall all formulas from memory.', completed: false },
      { id: 'w23t4', category: 'weekend_war', title: '100 PYQ Final Sprint', description: 'Solve 100 mixed PYQs — focus on 2-mark and NAT-type questions. Target: 80%+ accuracy.', pyqTarget: 100, completed: false },
    ]
  },
  {
    weekNumber: 24, startDate: '2027-01-11', endDate: '2027-01-31', phaseId: 4,
    title: 'GATE 2027 Final Countdown',
    missionObjective: 'Light revision, confidence building, exam-day strategy, final mock',
    syllabusFocus: ['Revision', 'Exam Strategy', 'Mental Preparation'],
    iitMadrasPivots: [],
    deprioritizedTopics: [],
    tasks: [
      { id: 'w24t1', category: 'night_deep_focus', title: 'Final Full Mock #6 (Exam Simulation)', description: 'Simulate actual GATE exam conditions: 9AM start, no breaks, 3-hour strict timer. Target: 70%+.', completed: false },
      { id: 'w24t2', category: 'night_deep_focus', title: 'Light Formula Revision (No New Topics)', description: 'Only revise your formula sheet. Read through personal notes. No new topics.', completed: false },
      { id: 'w24t3', category: 'office_micro_learning', title: 'Time Management Strategy', description: '10-min: Plan GATE exam time allocation per section (GA: 15 min, CS: 105 min).', completed: false },
      { id: 'w24t4', category: 'weekend_war', title: 'Confidence Builder: Easy PYQ Blitz', description: 'Solve 50 easy/medium PYQs to build confidence. End on a high note!', pyqTarget: 50, completed: false },
    ]
  },
];
