import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Moon, Briefcase, Swords, Calendar, Clock, Target, CheckSquare, 
  Square, FileText, Download, Upload, RotateCcw, Play, Pause, 
  Filter, Flame, Ban, X, ChevronDown, ChevronUp, Menu
} from 'lucide-react';

// --- TYPES ---
export type TaskCategory = 'night_deep_focus' | 'office_micro_learning' | 'weekend_war';

export interface Task {
  id: string;
  category: TaskCategory;
  title: string;
  description: string;
  pyqTarget?: number;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface WeekPlan {
  weekNumber: number;
  startDate: string;
  endDate: string;
  phaseId: number;
  title: string;
  missionObjective: string;
  syllabusFocus: string[];
  iitMadrasPivots?: string[];
  deprioritizedTopics?: string[];
  tasks: Task[];
}

export interface AppState {
  weeks: WeekPlan[];
  stats: {
    totalPyqsSolved: number;
    targetPyqs: number;
  };
}

// --- INITIAL SEED DATA (24 WEEKS) ---
const INITIAL_WEEKS: WeekPlan[] = [
  // Phase 1: Foundation Core (Weeks 1-4 | Aug 3 - Aug 30)
  {
    weekNumber: 1, startDate: '2026-08-03', endDate: '2026-08-09', phaseId: 1,
    title: 'Digital Logic Foundations',
    missionObjective: 'Master Boolean Algebra, Canonical SOP/POS, and K-Map minimization rules',
    syllabusFocus: ['Boolean Algebra', 'K-Maps', 'Quine-McCluskey'],
    iitMadrasPivots: ['Tabular Quine-McCluskey minimization', 'K-Maps', 'Boolean algebra'],
    tasks: [
      { id: 'w1_t1', category: 'night_deep_focus', title: 'Boolean Proofs & Theorems', description: 'Deep focus on De Morgan, Duality, Consensus Theorem & Canonical SOP/POS representations.', pyqTarget: 15, completed: false },
      { id: 'w1_t2', category: 'office_micro_learning', title: 'K-Map Grouping Dry Runs', description: '10-min office drills: 3 & 4 variable K-map prime implicant identifications.', completed: false },
      { id: 'w1_t3', category: 'weekend_war', title: 'Digital Logic PYQ Sprint #1', description: 'Weekend marathon: Solve 40 PYQs on Boolean Algebra & K-Maps.', pyqTarget: 40, completed: false }
    ]
  },
  {
    weekNumber: 2, startDate: '2026-08-10', endDate: '2026-08-16', phaseId: 1,
    title: 'Quine-McCluskey & Combinational Logic',
    missionObjective: 'Master Tabular Quine-McCluskey minimization and Adders/Mux design',
    syllabusFocus: ['Quine-McCluskey Method', 'Adders & Subtractors', 'Multiplexers & Decoders'],
    iitMadrasPivots: ['Explicit Tabular Quine-McCluskey minimization method'],
    tasks: [
      { id: 'w2_t1', category: 'night_deep_focus', title: 'Quine-McCluskey Tabular Execution', description: 'Step-by-step prime implicant chart construction and essential prime implicant extraction.', pyqTarget: 20, completed: false },
      { id: 'w2_t2', category: 'office_micro_learning', title: 'Mux Tree Tracing', description: '15-min flashcard drill: Implementing logic functions using 4:1 and 8:1 Muxes.', completed: false },
      { id: 'w2_t3', category: 'weekend_war', title: 'Combinational Circuit PYQ Sprint', description: 'Weekend marathon: 50 PYQs on Adders, Look-Ahead Carry & Decoders.', pyqTarget: 50, completed: false }
    ]
  },
  {
    weekNumber: 3, startDate: '2026-08-17', endDate: '2026-08-23', phaseId: 1,
    title: 'Sequential Circuits & Flip-Flops',
    missionObjective: 'Master Latching, Flip-Flop Conversions, and Synchronous Counters',
    syllabusFocus: ['Latches & Flip-Flops', 'Counters & Shift Registers', 'State Minimization'],
    tasks: [
      { id: 'w3_t1', category: 'night_deep_focus', title: 'Flip-Flop Conversion & Excitation Analysis', description: 'Derive characteristic equations for JK, SR, D, T and execute conversion matrices.', pyqTarget: 20, completed: false },
      { id: 'w3_t2', category: 'office_micro_learning', title: 'Mod-N Counter State Tracing', description: '10-min paper drill: Trace Mod-6 and Mod-10 ripple vs synchronous counters.', completed: false },
      { id: 'w3_t3', category: 'weekend_war', title: 'Sequential Circuit PYQ Sprint', description: 'Weekend marathon: 60 PYQs on state transitions and setup/hold times.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 4, startDate: '2026-08-24', endDate: '2026-08-30', phaseId: 1,
    title: 'COA: Control Unit Architecture',
    missionObjective: 'Differentiate Hardwired vs Microprogrammed CU design & Micro-operations',
    syllabusFocus: ['Hardwired Control Unit', 'Microprogrammed Control', 'Micro-instruction Format'],
    iitMadrasPivots: ['Hardwired vs. Microprogrammed Control Unit design'],
    deprioritizedTopics: ['Generic secondary/main storage listings'],
    tasks: [
      { id: 'w4_t1', category: 'night_deep_focus', title: 'Control Unit Microarchitecture', description: 'Horizontal vs Vertical microinstructions, control memory sizing, branch address generation.', pyqTarget: 25, completed: false },
      { id: 'w4_t2', category: 'office_micro_learning', title: 'Micro-op Sequencing Recall', description: '15-min drill: Fetch cycle micro-operations and bus allocation timing.', completed: false },
      { id: 'w4_t3', category: 'weekend_war', title: 'Phase 1 Consolidation Sprint', description: 'Weekend War: 60 PYQs combining Digital Logic + CU Architecture.', pyqTarget: 60, completed: false }
    ]
  },

  // Phase 2: Programming & Theoretical Core (Weeks 5-12 | Aug 31 - Oct 25)
  {
    weekNumber: 5, startDate: '2026-08-31', endDate: '2026-09-06', phaseId: 2,
    title: 'Data Structures: Recursion & Pointers',
    missionObjective: 'Master recursion tree tracing, stack frame analysis, and linked lists',
    syllabusFocus: ['Recursion', 'Stack Frames', 'Linked Lists', 'Arrays & Matrices'],
    tasks: [
      { id: 'w5_t1', category: 'night_deep_focus', title: 'Recursive Call Stack Analysis', description: 'Trace complex static variable recursion, tree recursion, and tail call optimization.', pyqTarget: 25, completed: false },
      { id: 'w5_t2', category: 'office_micro_learning', title: 'Pointer Arithmetic Tracing', description: '15-min mobile drill: C pointer dereferencing and 2D array row-major calculations.', completed: false },
      { id: 'w5_t3', category: 'weekend_war', title: 'C Programming & Structures PYQ Sprint', description: 'Weekend marathon: 60 PYQs on C recursion, pointers, and memory layout.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 6, startDate: '2026-09-07', endDate: '2026-09-13', phaseId: 2,
    title: 'Data Structures: Trees & Heaps',
    missionObjective: 'Master Binary Search Trees, AVL rotations, Heapify & Priority Queues',
    syllabusFocus: ['BST', 'AVL Trees', 'Max/Min Heaps', 'Tree Traversal'],
    tasks: [
      { id: 'w6_t1', category: 'night_deep_focus', title: 'AVL Tree Balancing & Rotations', description: 'LL, RR, LR, RL rotation dry runs and height-balance proofs.', pyqTarget: 20, completed: false },
      { id: 'w6_t2', category: 'office_micro_learning', title: 'Traversals Reconstruction Drill', description: '10-min paper drill: Reconstruct unique BST from Inorder + Preorder/Postorder.', completed: false },
      { id: 'w6_t3', category: 'weekend_war', title: 'Tree & Heap PYQ Sprint', description: 'Weekend marathon: 50 PYQs on Tree properties, Heapsort, and Heapify bounds.', pyqTarget: 50, completed: false }
    ]
  },
  {
    weekNumber: 7, startDate: '2026-09-14', endDate: '2026-09-20', phaseId: 2,
    title: 'Algorithms: Asymptotics & Sorting',
    missionObjective: 'Master Master Theorem, Recurrence Relations, and Sorting Lower Bounds',
    syllabusFocus: ['Master Theorem', 'Quick/Merge/Heap Sort', 'Counting Sort', 'Asymptotic Notation'],
    tasks: [
      { id: 'w7_t1', category: 'night_deep_focus', title: 'Recurrence Trees & Substitution Method', description: 'Solve non-standard recurrences, Master Theorem case 1-3 exceptions, divide & conquer.', pyqTarget: 25, completed: false },
      { id: 'w7_t2', category: 'office_micro_learning', title: 'Sorting Complexity Matrix Drill', description: '10-min recall: Best, Average, Worst case time/space and stability of all sorts.', completed: false },
      { id: 'w7_t3', category: 'weekend_war', title: 'Sorting & Recurrences PYQ Sprint', description: 'Weekend marathon: 60 PYQs on sorting algorithms & recurrence analysis.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 8, startDate: '2026-09-21', endDate: '2026-09-27', phaseId: 2,
    title: 'Algorithms: Dynamic Programming & Greedy',
    missionObjective: 'Master Matrix Chain Multiplication, LCS, 0/1 Knapsack & Optimal Substructure',
    syllabusFocus: ['Dynamic Programming', 'Greedy Strategy', 'Huffman Coding'],
    tasks: [
      { id: 'w8_t1', category: 'night_deep_focus', title: 'DP Recurrence Formulation', description: 'Formulate state transitions for LCS, LIS, Matrix Chain & Subset Sum.', pyqTarget: 25, completed: false },
      { id: 'w8_t2', category: 'office_micro_learning', title: 'Greedy Choice Proof Drills', description: '15-min paper drill: Activity selection & Fractional Knapsack greedy choices.', completed: false },
      { id: 'w8_t3', category: 'weekend_war', title: 'DP & Greedy PYQ Sprint', description: 'Weekend marathon: 50 PYQs on Dynamic Programming & Huffman Trees.', pyqTarget: 50, completed: false }
    ]
  },
  {
    weekNumber: 9, startDate: '2026-09-28', endDate: '2026-10-04', phaseId: 2,
    title: 'Theory of Computation: Finite Automata',
    missionObjective: 'Master DFA/NFA Construction, State Minimization & Regular Expressions',
    syllabusFocus: ['DFA & NFA', 'Mealy/Moore Machines', 'Regular Expressions', 'Arden Theorem'],
    tasks: [
      { id: 'w9_t1', category: 'night_deep_focus', title: 'DFA State Minimization Algorithm', description: 'Equivalence partition method and Myhill-Nerode theorem applications.', pyqTarget: 25, completed: false },
      { id: 'w9_t2', category: 'office_micro_learning', title: 'DFA Tracing & Regex Matching', description: '10-min mobile drill: Converting NFA to DFA and matching strings against Regex.', completed: false },
      { id: 'w9_t3', category: 'weekend_war', title: 'Automata PYQ Sprint', description: 'Weekend marathon: 60 PYQs on DFA/NFA equivalence and Regular Languages.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 10, startDate: '2026-10-05', endDate: '2026-10-11', phaseId: 2,
    title: 'Theory of Computation: Context Free & Turing',
    missionObjective: 'Master CFG, Pushdown Automata, Pumping Lemma & Decidability Hierarchy',
    syllabusFocus: ['CFG & Parse Trees', 'PDA', 'Pumping Lemma', 'Turing Machines', 'Decidability'],
    tasks: [
      { id: 'w10_t1', category: 'night_deep_focus', title: 'Closure Properties & Decidability Matrix', description: 'Memorize & prove closure properties across Regular, CFL, DCFL, CSL, REC, RE.', pyqTarget: 30, completed: false },
      { id: 'w10_t2', category: 'office_micro_learning', title: 'Grammar Ambiguity Check Drills', description: '15-min drill: Identifying left/right recursion and ambiguous parse trees.', completed: false },
      { id: 'w10_t3', category: 'weekend_war', title: 'TOC Decidability PYQ Sprint', description: 'Weekend marathon: 60 PYQs on Decidability, Halting Problem & PDA.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 11, startDate: '2026-10-12', endDate: '2026-10-18', phaseId: 2,
    title: 'Compiler Design: Lexical & Parsing',
    missionObjective: 'Master FIRST & FOLLOW Sets, LL(1), LR(0), SLR(1), LALR(1) Parsers',
    syllabusFocus: ['FIRST & FOLLOW', 'LL(1) Conflict Analysis', 'LR Parsing Tables', 'SDT'],
    tasks: [
      { id: 'w11_t1', category: 'night_deep_focus', title: 'LR(0) & SLR(1) Item Set Construction', description: 'DFA of canonical items, shift-reduce & reduce-reduce conflict detection.', pyqTarget: 25, completed: false },
      { id: 'w11_t2', category: 'office_micro_learning', title: 'FIRST & FOLLOW Calculation Drills', description: '15-min paper drill: Compute FIRST & FOLLOW for 5 complex grammars.', completed: false },
      { id: 'w11_t3', category: 'weekend_war', title: 'Compiler Parsing PYQ Sprint', description: 'Weekend marathon: 50 PYQs on LL/LR parsers & Syntax Directed Translation.', pyqTarget: 50, completed: false }
    ]
  },
  {
    weekNumber: 12, startDate: '2026-10-19', endDate: '2026-10-25', phaseId: 2,
    title: 'Phase 2 Theoretical Mega Sprint',
    missionObjective: 'Consolidate Programming, Algorithms, TOC, and Compiler Design',
    syllabusFocus: ['All Phase 2 Topics', 'NAT Problems', 'Mixed PYQ Marathon'],
    tasks: [
      { id: 'w12_t1', category: 'night_deep_focus', title: 'Complex NAT Algorithm Drills', description: 'Solve 20 high-value NAT problems in Graph Theory, DP & Turing Machines.', pyqTarget: 20, completed: false },
      { id: 'w12_t2', category: 'office_micro_learning', title: 'Formula & Property Flashcards', description: '15-min recall: TOC Closure Matrix & Sorting complexity lower bounds.', completed: false },
      { id: 'w12_t3', category: 'weekend_war', title: 'Phase 2 War Zone Marathon', description: 'Weekend marathon: 80 PYQs covering Algorithms + TOC + Compiler.', pyqTarget: 80, completed: false }
    ]
  },

  // Phase 3: Systems Architecture Core (Weeks 13-20 | Oct 26 - Dec 20)
  {
    weekNumber: 13, startDate: '2026-10-26', endDate: '2026-11-01', phaseId: 3,
    title: 'COA: Memory Hierarchy & Cache Mapping',
    missionObjective: 'Master Direct, Set-Associative Mapping, Hit Time & AMAT Formulas',
    syllabusFocus: ['Direct Mapping', 'Set-Associative Mapping', 'Cache Hit Ratio', 'AMAT Formula'],
    iitMadrasPivots: ['Cache Memory Mapping & Performance formulas'],
    deprioritizedTopics: ['Generic secondary/main storage listings'],
    tasks: [
      { id: 'w13_t1', category: 'night_deep_focus', title: 'Cache Address Breakdown & AMAT Proofs', description: 'Tag/Index/Offset bit calculation for k-way set associative caches under multi-level RAM.', pyqTarget: 30, completed: false },
      { id: 'w13_t2', category: 'office_micro_learning', title: 'AMAT Numerical Speed Drills', description: '10-min paper drill: AMAT = Hit Time + Miss Rate * Miss Penalty calculations.', completed: false },
      { id: 'w13_t3', category: 'weekend_war', title: 'Cache Memory PYQ Sprint', description: 'Weekend marathon: 60 PYQs on Cache mapping, Write-through vs Write-back.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 14, startDate: '2026-11-02', endDate: '2026-11-08', phaseId: 3,
    title: 'COA: Pipelining Hazards & Throughput',
    missionObjective: 'Master Data/Control/Structural Hazards, Stalls, Speedup & CPI calculations',
    syllabusFocus: ['Pipelining Stages', 'Data Hazards & Forwarding', 'Branch Penalty', 'Speedup Ratio'],
    iitMadrasPivots: ['Pipelining Hazards & Throughput'],
    tasks: [
      { id: 'w14_t1', category: 'night_deep_focus', title: 'Pipeline Stall Cycle Analysis', description: 'Calculate CPI under Operand Forwarding, Branch Target Buffers, and Hazard delays.', pyqTarget: 30, completed: false },
      { id: 'w14_t2', category: 'office_micro_learning', title: 'Speedup & Throughput Drills', description: '15-min paper drill: Speedup = (N * K) / (K + N - 1 + Stalls) executions.', completed: false },
      { id: 'w14_t3', category: 'weekend_war', title: 'Pipelining PYQ Sprint', description: 'Weekend marathon: 60 PYQs on Pipelining hazards & performance ratios.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 15, startDate: '2026-11-09', endDate: '2026-11-15', phaseId: 3,
    title: 'Operating Systems: Processes & Scheduling',
    missionObjective: 'Master CPU Scheduling (FCFS, SJF, SRTF, RR), Process States, and Threads',
    syllabusFocus: ['Process State Transitions', 'CPU Scheduling', 'Thread Synchronization', 'Forking'],
    tasks: [
      { id: 'w15_t1', category: 'night_deep_focus', title: 'Gantt Chart & Turnaround Calculation', description: 'Calculate Average Waiting Time & Turnaround Time for SRTF and Round Robin with Context Switches.', pyqTarget: 25, completed: false },
      { id: 'w15_t2', category: 'office_micro_learning', title: 'Fork Tree Tracing', description: '10-min drill: Trace process creation count for nested fork() loops.', completed: false },
      { id: 'w15_t3', category: 'weekend_war', title: 'OS Scheduling PYQ Sprint', description: 'Weekend marathon: 60 PYQs on CPU Scheduling algorithms & Threads.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 16, startDate: '2026-11-16', endDate: '2026-11-22', phaseId: 3,
    title: 'Operating Systems: Synchronization & Deadlocks',
    missionObjective: 'Master Semaphores, Peterson Solution, Banker Algorithm & Resource Graphs',
    syllabusFocus: ['Semaphores & Mutex', 'Producer-Consumer Problem', 'Banker Algorithm', 'Deadlock Avoidance'],
    tasks: [
      { id: 'w16_t1', category: 'night_deep_focus', title: 'Semaphore Synchronization Proofs', description: 'Analyze race conditions, deadlocks, and progress/bounded waiting in Semaphore code.', pyqTarget: 25, completed: false },
      { id: 'w16_t2', category: 'office_micro_learning', title: "Banker's Safety Matrix Drill", description: '15-min drill: Compute Need matrix and safe execution sequences.', completed: false },
      { id: 'w16_t3', category: 'weekend_war', title: 'Concurrency & Deadlock PYQ Sprint', description: 'Weekend marathon: 55 PYQs on Synchronization & Deadlocks.', pyqTarget: 55, completed: false }
    ]
  },
  {
    weekNumber: 17, startDate: '2026-11-23', endDate: '2026-11-29', phaseId: 3,
    title: 'Operating Systems: Virtual Memory & Paging',
    missionObjective: 'Master Multilevel Paging, Page Table Size, TLB, and Page Replacement Algorithms',
    syllabusFocus: ['Paging & Segmentation', 'Multilevel Page Tables', 'TLB Hit Ratio', 'Page Replacement'],
    tasks: [
      { id: 'w17_t1', category: 'night_deep_focus', title: 'Multilevel Address Translation Proofs', description: 'Calculate Virtual/Physical address space division, Page Table Entry sizes & RAM overhead.', pyqTarget: 30, completed: false },
      { id: 'w17_t2', category: 'office_micro_learning', title: 'FIFO/LRU Page Fault Tracing', description: '10-min paper drill: Trace Belady Anomaly and LRU page fault count.', completed: false },
      { id: 'w17_t3', category: 'weekend_war', title: 'Virtual Memory PYQ Sprint', description: 'Weekend marathon: 60 PYQs on Paging, TLB, & Page Replacement.', pyqTarget: 60, completed: false }
    ]
  },
  {
    weekNumber: 18, startDate: '2026-11-30', endDate: '2026-12-06', phaseId: 3,
    title: 'Computer Networks: Routing Protocols & IP',
    missionObjective: 'Master Distance-Vector & Link-State Routing, IPv4 Header, Fragmentation & CIDR',
    syllabusFocus: ['Distance-Vector Routing', 'Link-State Routing', 'IPv4 Fragmentation', 'CIDR & NAT'],
    iitMadrasPivots: ['Distance-Vector & Link-State routing', 'IPv4 Fragmentation', 'CIDR', 'NAT'],
    deprioritizedTopics: ['UDP', 'ARP', 'DHCP', 'ICMP', 'Flooding', 'standalone Shortest Path'],
    tasks: [
      { id: 'w18_t1', category: 'night_deep_focus', title: 'Distance-Vector & Link-State Algorithmic Analysis', description: 'Count-to-infinity problem, split horizon, poison reverse, and OSPF Link-State Packets.', pyqTarget: 30, completed: false },
      { id: 'w18_t2', category: 'office_micro_learning', title: 'IPv4 Fragmentation & Subnetting Drill', description: '15-min paper drill: Calculate Fragment Offset, MF bit, and CIDR subnet masks.', completed: false },
      { id: 'w18_t3', category: 'weekend_war', title: 'IP & Routing PYQ Sprint', description: 'Weekend marathon: 65 PYQs on CIDR, IPv4 Fragmentation, & Routing protocols.', pyqTarget: 65, completed: false }
    ]
  },
  {
    weekNumber: 19, startDate: '2026-12-07', endDate: '2026-12-13', phaseId: 3,
    title: 'Computer Networks: TCP Flow & Congestion Control',
    missionObjective: 'Master Sliding Window Protocols, TCP Congestion Control, and Socket API',
    syllabusFocus: ['Sliding Window (GBN / SR)', 'TCP 3-Way Handshake', 'AIMD & Congestion Window', 'Socket API', 'DNS', 'HTTP'],
    iitMadrasPivots: ['TCP flow & congestion control', 'Socket API', 'DNS', 'HTTP'],
    deprioritizedTopics: ['SMTP', 'FTP', 'Email'],
    tasks: [
      { id: 'w19_t1', category: 'night_deep_focus', title: 'TCP Congestion Dynamics & Throughput', description: 'Slow Start, Congestion Avoidance, Fast Retransmit, RTT estimation & Window Size Math.', pyqTarget: 30, completed: false },
      { id: 'w19_t2', category: 'office_micro_learning', title: 'Stop-and-Wait / GBN Efficiency Drill', description: '10-min paper drill: Efficiency n = 1 / (1 + 2a) and Bandwidth-Delay Product.', completed: false },
      { id: 'w19_t3', category: 'weekend_war', title: 'Transport & Application Layer PYQ Sprint', description: 'Weekend marathon: 65 PYQs on TCP, Congestion, DNS, HTTP, & Sockets.', pyqTarget: 65, completed: false }
    ]
  },
  {
    weekNumber: 20, startDate: '2026-12-14', endDate: '2026-12-20', phaseId: 3,
    title: 'DBMS: Relational Algebra & Normalization',
    missionObjective: 'Master Tuple Relational Calculus, Functional Dependencies, 3NF & BCNF Lossless Decomposition',
    syllabusFocus: ['Relational Algebra', 'Functional Dependencies', '3NF / BCNF', 'Lossless Join & Dependency Preservation'],
    tasks: [
      { id: 'w20_t1', category: 'night_deep_focus', title: 'Attribute Closure & Normal Form Testing', description: 'Derive minimal cover, candidate keys, 3NF, BCNF decomposition proofs.', pyqTarget: 25, completed: false },
      { id: 'w20_t2', category: 'office_micro_learning', title: 'Relational Algebra Query Drills', description: '15-min mobile drill: Cross product, natural join, and division operator syntax.', completed: false },
      { id: 'w20_t3', category: 'weekend_war', title: 'DBMS Normalization PYQ Sprint', description: 'Weekend marathon: 60 PYQs on Relational Algebra & Normalization.', pyqTarget: 60, completed: false }
    ]
  },

  // Phase 4: Consolidation & Mock Marathon (Weeks 21-24 | Dec 21 - Feb 2027)
  {
    weekNumber: 21, startDate: '2026-12-21', endDate: '2026-12-27', phaseId: 4,
    title: 'DBMS Concurrency & Comprehensive Mock #1',
    missionObjective: 'Master Conflict Serializability, 2PL, Strict 2PL & Take Full Mock #1',
    syllabusFocus: ['Conflict Serializability', 'Precedence Graph', '2PL & Strict 2PL', 'Full Mock Test 1'],
    tasks: [
      { id: 'w21_t1', category: 'night_deep_focus', title: 'Precedence Graph & 2PL Proofs', description: 'Detect conflict serializability via cycle testing and analyze Cascading Aborts.', pyqTarget: 25, completed: false },
      { id: 'w21_t2', category: 'office_micro_learning', title: 'Weak-Area Error Analysis', description: '15-min daily drill: Reviewing wrong questions from previous week subject tests.', completed: false },
      { id: 'w21_t3', category: 'weekend_war', title: 'FULL GATE MOCK #1 (65 Qs / 3 Hrs)', description: 'Weekend War: Full Length Mock 1 in real exam environment + NAT Killer Session.', pyqTarget: 65, completed: false }
    ]
  },
  {
    weekNumber: 22, startDate: '2026-12-28', endDate: '2027-01-03', phaseId: 4,
    title: 'Full Length Mock Marathon II',
    missionObjective: 'Execute Full Mock #2 & #3, Rectify NAT Weaknesses & Formula Recall',
    syllabusFocus: ['Full Mock Test 2', 'Full Mock Test 3', 'NAT Accuracy Drills'],
    tasks: [
      { id: 'w22_t1', category: 'night_deep_focus', title: 'NAT Trap Rectification Session', description: 'Deep analysis of numerical precision errors, units, and rounding pitfalls in Mocks.', pyqTarget: 30, completed: false },
      { id: 'w22_t2', category: 'office_micro_learning', title: 'Formula Flashcards Speed Recall', description: '15-min mobile drill: AMAT, Speedup, Multilevel Page Table size, Subnetting formulas.', completed: false },
      { id: 'w22_t3', category: 'weekend_war', title: 'FULL GATE MOCK #2 & #3 Sprint', description: 'Weekend War: Attempt 2 Full Length Mocks (130 questions) with timer.', pyqTarget: 130, completed: false }
    ]
  },
  {
    weekNumber: 23, startDate: '2027-01-04', endDate: '2027-01-10', phaseId: 4,
    title: 'IIT Madras High-Pivot Targeted Mocks',
    missionObjective: 'Targeted focus on QM, Microarchitecture, Cache, TCP & Routing High-Weightage Qs',
    syllabusFocus: ['IIT Madras Pivots Special', 'Full Mock Test 4', 'Weak Area Remediation'],
    iitMadrasPivots: ['All High-Priority IIT Madras Updates'],
    tasks: [
      { id: 'w23_t1', category: 'night_deep_focus', title: 'IIT Madras High-Pivot Drill Session', description: 'Solve 30 complex problems on QM, CU Microprogrammed, Cache AMAT, CIDR & TCP AIMD.', pyqTarget: 30, completed: false },
      { id: 'w23_t2', category: 'office_micro_learning', title: 'Paper Micro-Revision Drills', description: '10-min paper drill: Quick drawing of K-Maps, State Machines, & Pipeline Gantt charts.', completed: false },
      { id: 'w23_t3', category: 'weekend_war', title: 'FULL GATE MOCK #4 & #5 Sprint', description: 'Weekend War: Attempt 2 Full Mocks focused on high accuracy (>75 marks target).', pyqTarget: 130, completed: false }
    ]
  },
  {
    weekNumber: 24, startDate: '2027-01-11', endDate: '2027-02-01', phaseId: 4,
    title: 'Final Countdown & Peak Performance',
    missionObjective: 'Final Formula Polish, Low-Stress Mocks, Mental Readiness for GATE 2027',
    syllabusFocus: ['Formula Sheet Polish', 'Final Mocks', 'Exam Strategy'],
    tasks: [
      { id: 'w24_t1', category: 'night_deep_focus', title: 'Master Formula Book Final Pass', description: 'Review handwritten master formula sheet for all 10 GATE CS subjects.', pyqTarget: 20, completed: false },
      { id: 'w24_t2', category: 'office_micro_learning', title: 'Exam Day Strategy & Timing Drill', description: '15-min planning: Allocating 3-pass strategy (Easy 45m -> Medium 90m -> Hard/NAT 45m).', completed: false },
      { id: 'w24_t3', category: 'weekend_war', title: 'FINAL SIMULATION MOCK (GATE 2027)', description: 'Final 3-hour mock under exact exam conditions. Rest & peak for exam day!', pyqTarget: 65, completed: false }
    ]
  }
];

const LOCAL_STORAGE_KEY = 'gate_cs_2027_tracker_data';

// --- GATE CS SUBJECT & TOPIC CHECKLIST ---
type TopicPriority = 'critical' | 'high' | 'medium' | 'low' | 'deprioritized';

interface TopicItem {
  id: string;
  name: string;
  priority: TopicPriority;
  completed: boolean;
  iitMadrasPivot?: boolean;
}

interface SubjectChecklist {
  id: string;
  name: string;
  icon: string;
  color: string;
  topics: TopicItem[];
}

const INITIAL_SUBJECTS: SubjectChecklist[] = [
  {
    id: 'digital_logic', name: 'Digital Logic', icon: '⚡', color: '#8C4A27',
    topics: [
      { id: 'dl_1', name: 'Boolean Algebra & Theorems', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'dl_2', name: 'K-Map Minimization (3, 4, 5 var)', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'dl_3', name: 'Quine-McCluskey (Tabular Method)', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'dl_4', name: 'Canonical SOP/POS Forms', priority: 'high', completed: false },
      { id: 'dl_5', name: 'Combinational Circuits (Adders, Mux, Decoders)', priority: 'high', completed: false },
      { id: 'dl_6', name: 'Sequential Circuits (Flip-Flops, Counters)', priority: 'high', completed: false },
      { id: 'dl_7', name: 'Flip-Flop Conversions & Excitation Tables', priority: 'high', completed: false },
      { id: 'dl_8', name: 'State Minimization & State Assignment', priority: 'medium', completed: false },
      { id: 'dl_9', name: 'Shift Registers', priority: 'medium', completed: false },
      { id: 'dl_10', name: 'Number Systems & Codes', priority: 'low', completed: false },
    ]
  },
  {
    id: 'coa', name: 'Computer Organization & Architecture', icon: '🖥️', color: '#4B5267',
    topics: [
      { id: 'coa_1', name: 'Hardwired vs Microprogrammed Control Unit', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'coa_2', name: 'Cache Mapping (Direct, Set-Associative, Fully)', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'coa_3', name: 'AMAT & Cache Performance Formulas', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'coa_4', name: 'Pipelining Hazards (Data, Control, Structural)', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'coa_5', name: 'Pipeline Speedup & Throughput', priority: 'high', completed: false },
      { id: 'coa_6', name: 'Micro-instruction Formats (Horizontal/Vertical)', priority: 'high', completed: false },
      { id: 'coa_7', name: 'Instruction Cycle & Addressing Modes', priority: 'high', completed: false },
      { id: 'coa_8', name: 'I/O Mechanisms (Interrupt, DMA, Polling)', priority: 'medium', completed: false },
      { id: 'coa_9', name: 'IEEE 754 Floating Point', priority: 'medium', completed: false },
      { id: 'coa_10', name: 'Secondary Storage (Generic)', priority: 'deprioritized', completed: false },
    ]
  },
  {
    id: 'dsa', name: 'Data Structures & Algorithms', icon: '🧮', color: '#2D5A27',
    topics: [
      { id: 'dsa_1', name: 'Recursion & Stack Frame Analysis', priority: 'critical', completed: false },
      { id: 'dsa_2', name: 'BST, AVL Trees & Rotations', priority: 'critical', completed: false },
      { id: 'dsa_3', name: 'Heaps, Heapify & Priority Queues', priority: 'critical', completed: false },
      { id: 'dsa_4', name: 'Graph Algorithms (BFS, DFS, Dijkstra, Prim, Kruskal)', priority: 'critical', completed: false },
      { id: 'dsa_5', name: 'Hashing (Open/Closed Addressing, Collision)', priority: 'high', completed: false },
      { id: 'dsa_6', name: 'Linked Lists, Stacks, Queues', priority: 'high', completed: false },
      { id: 'dsa_7', name: 'B-Trees & B+ Trees', priority: 'medium', completed: false },
      { id: 'dsa_8', name: 'Tries & Suffix Trees', priority: 'low', completed: false },
    ]
  },
  {
    id: 'algo', name: 'Algorithms', icon: '📊', color: '#C85A32',
    topics: [
      { id: 'algo_1', name: 'Master Theorem & Recurrence Relations', priority: 'critical', completed: false },
      { id: 'algo_2', name: 'Dynamic Programming (LCS, LIS, MCM, Knapsack)', priority: 'critical', completed: false },
      { id: 'algo_3', name: 'Greedy Algorithms & Optimality Proofs', priority: 'critical', completed: false },
      { id: 'algo_4', name: 'Sorting (Quick, Merge, Heap, Counting, Radix)', priority: 'high', completed: false },
      { id: 'algo_5', name: 'Divide & Conquer Strategy', priority: 'high', completed: false },
      { id: 'algo_6', name: 'Asymptotic Notation (Big-O, Theta, Omega)', priority: 'high', completed: false },
      { id: 'algo_7', name: 'Graph Algorithms (Shortest Path, MST, Topological)', priority: 'high', completed: false },
      { id: 'algo_8', name: 'NP-Completeness & Reduction', priority: 'medium', completed: false },
      { id: 'algo_9', name: 'Backtracking & Branch and Bound', priority: 'low', completed: false },
    ]
  },
  {
    id: 'toc', name: 'Theory of Computation', icon: '🔄', color: '#8C4A27',
    topics: [
      { id: 'toc_1', name: 'DFA & NFA Construction & Equivalence', priority: 'critical', completed: false },
      { id: 'toc_2', name: 'Regular Expressions & Arden Theorem', priority: 'critical', completed: false },
      { id: 'toc_3', name: 'DFA State Minimization (Myhill-Nerode)', priority: 'critical', completed: false },
      { id: 'toc_4', name: 'Context Free Grammars & Parse Trees', priority: 'critical', completed: false },
      { id: 'toc_5', name: 'Pushdown Automata (PDA)', priority: 'high', completed: false },
      { id: 'toc_6', name: 'Pumping Lemma (Regular & CFL)', priority: 'high', completed: false },
      { id: 'toc_7', name: 'Turing Machines & Decidability', priority: 'high', completed: false },
      { id: 'toc_8', name: 'Closure Properties (Reg, CFL, DCFL, RE, REC)', priority: 'high', completed: false },
      { id: 'toc_9', name: 'Rice Theorem & Halting Problem', priority: 'medium', completed: false },
      { id: 'toc_10', name: 'Mealy & Moore Machine Conversions', priority: 'medium', completed: false },
    ]
  },
  {
    id: 'compiler', name: 'Compiler Design', icon: '⚙️', color: '#D49B35',
    topics: [
      { id: 'cd_1', name: 'FIRST & FOLLOW Set Computation', priority: 'critical', completed: false },
      { id: 'cd_2', name: 'LL(1) Parser & Conflict Detection', priority: 'critical', completed: false },
      { id: 'cd_3', name: 'LR(0), SLR(1), CLR(1), LALR(1) Parsers', priority: 'critical', completed: false },
      { id: 'cd_4', name: 'Syntax Directed Translation (SDT/SDD)', priority: 'high', completed: false },
      { id: 'cd_5', name: 'Lexical Analysis & Tokenization', priority: 'high', completed: false },
      { id: 'cd_6', name: 'Intermediate Code (TAC, Quadruples)', priority: 'medium', completed: false },
      { id: 'cd_7', name: 'Code Optimization Techniques', priority: 'medium', completed: false },
      { id: 'cd_8', name: 'Runtime Environments & Activation Records', priority: 'low', completed: false },
    ]
  },
  {
    id: 'os', name: 'Operating Systems', icon: '💻', color: '#4B5267',
    topics: [
      { id: 'os_1', name: 'CPU Scheduling (FCFS, SJF, SRTF, RR, Priority)', priority: 'critical', completed: false },
      { id: 'os_2', name: 'Process Synchronization & Semaphores', priority: 'critical', completed: false },
      { id: 'os_3', name: 'Deadlock (Banker Algorithm, Resource Graphs)', priority: 'critical', completed: false },
      { id: 'os_4', name: 'Virtual Memory & Multilevel Paging', priority: 'critical', completed: false },
      { id: 'os_5', name: 'Page Replacement (FIFO, LRU, Optimal)', priority: 'critical', completed: false },
      { id: 'os_6', name: 'TLB & Effective Memory Access Time', priority: 'high', completed: false },
      { id: 'os_7', name: 'Process States & Fork() Tracing', priority: 'high', completed: false },
      { id: 'os_8', name: 'Disk Scheduling (SCAN, SSTF, C-SCAN)', priority: 'medium', completed: false },
      { id: 'os_9', name: 'File Systems & Allocation Methods', priority: 'medium', completed: false },
      { id: 'os_10', name: 'Threads (User vs Kernel, Multi-threading)', priority: 'medium', completed: false },
    ]
  },
  {
    id: 'cn', name: 'Computer Networks', icon: '🌐', color: '#2D5A27',
    topics: [
      { id: 'cn_1', name: 'TCP Flow & Congestion Control (AIMD)', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'cn_2', name: 'Distance-Vector & Link-State Routing', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'cn_3', name: 'IPv4 Fragmentation & CIDR Subnetting', priority: 'critical', completed: false, iitMadrasPivot: true },
      { id: 'cn_4', name: 'Sliding Window (GBN, Selective Repeat)', priority: 'critical', completed: false },
      { id: 'cn_5', name: 'Socket API, DNS, HTTP', priority: 'high', completed: false, iitMadrasPivot: true },
      { id: 'cn_6', name: 'NAT & Port Forwarding', priority: 'high', completed: false, iitMadrasPivot: true },
      { id: 'cn_7', name: 'OSI & TCP/IP Layer Models', priority: 'high', completed: false },
      { id: 'cn_8', name: 'Ethernet, CSMA/CD, CSMA/CA', priority: 'medium', completed: false },
      { id: 'cn_9', name: 'Error Detection (CRC, Checksum, Hamming)', priority: 'medium', completed: false },
      { id: 'cn_10', name: 'UDP, ARP, DHCP, ICMP', priority: 'deprioritized', completed: false },
      { id: 'cn_11', name: 'SMTP, FTP, Email Protocols', priority: 'deprioritized', completed: false },
    ]
  },
  {
    id: 'dbms', name: 'Database Management Systems', icon: '🗃️', color: '#C85A32',
    topics: [
      { id: 'db_1', name: 'Relational Algebra (σ, π, ⋈, ÷)', priority: 'critical', completed: false },
      { id: 'db_2', name: 'Functional Dependencies & Candidate Keys', priority: 'critical', completed: false },
      { id: 'db_3', name: '3NF & BCNF Decomposition (Lossless, DP)', priority: 'critical', completed: false },
      { id: 'db_4', name: 'Conflict Serializability & Precedence Graph', priority: 'critical', completed: false },
      { id: 'db_5', name: '2PL, Strict 2PL & Deadlock in Transactions', priority: 'high', completed: false },
      { id: 'db_6', name: 'SQL Queries & Nested Queries', priority: 'high', completed: false },
      { id: 'db_7', name: 'ER Model & Relational Model Mapping', priority: 'high', completed: false },
      { id: 'db_8', name: 'Indexing (B-Tree, B+Tree, Hashing)', priority: 'medium', completed: false },
      { id: 'db_9', name: 'Recovery & Logging (ARIES, WAL)', priority: 'medium', completed: false },
      { id: 'db_10', name: 'Tuple Relational Calculus', priority: 'medium', completed: false },
    ]
  },
  {
    id: 'maths', name: 'Engineering Mathematics', icon: '📐', color: '#D49B35',
    topics: [
      { id: 'ma_1', name: 'Propositional & Predicate Logic', priority: 'critical', completed: false },
      { id: 'ma_2', name: 'Set Theory, Relations & Functions', priority: 'critical', completed: false },
      { id: 'ma_3', name: 'Combinatorics & Counting Principles', priority: 'high', completed: false },
      { id: 'ma_4', name: 'Graph Theory (Euler, Hamilton, Trees, Coloring)', priority: 'high', completed: false },
      { id: 'ma_5', name: 'Probability & Bayes Theorem', priority: 'high', completed: false },
      { id: 'ma_6', name: 'Linear Algebra (Matrices, Eigenvalues, Rank)', priority: 'high', completed: false },
      { id: 'ma_7', name: 'Groups, Rings, Lattices, Partial Orders', priority: 'medium', completed: false },
      { id: 'ma_8', name: 'Calculus (Limits, Continuity, Integration)', priority: 'medium', completed: false },
      { id: 'ma_9', name: 'Generating Functions & Recurrences', priority: 'low', completed: false },
    ]
  },
];

const SUBJECTS_STORAGE_KEY = 'gate_cs_2027_subjects_data';

// --- MAIN APP COMPONENT ---
export default function App() {
  // Subject Checklist Tray State
  const [checklistTrayOpen, setChecklistTrayOpen] = useState<boolean>(false);
  const [activeSubjectId, setActiveSubjectId] = useState<string>('digital_logic');
  const [subjectPriorityFilter, setSubjectPriorityFilter] = useState<string>('all');

  // Subject Checklist State
  const [subjects, setSubjects] = useState<SubjectChecklist[]>(() => {
    try {
      const saved = localStorage.getItem(SUBJECTS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load subjects from localStorage', e);
    }
    return INITIAL_SUBJECTS;
  });

  const [weeks, setWeeks] = useState<WeekPlan[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && Array.isArray(parsed.weeks) && parsed.weeks.length > 0) {
          // Validate that tasks exist and have valid structure
          const valid = parsed.weeks.every((w: any) => w && Array.isArray(w.tasks));
          if (valid) return parsed.weeks;
        }
      }
    } catch (e) {
      console.error("Failed to load from local storage", e);
    }
    return INITIAL_WEEKS;
  });

  const [activePhase, setActivePhase] = useState<number>(0);
  const [selectedZone, setSelectedZone] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1); // Default open Week 1
  
  // Timer State
  const [timerOpen, setTimerOpen] = useState(false);
  const [activePreset, setActivePreset] = useState<'3h' | '1h' | '8h'>('3h');
  const [timeLeft, setTimeLeft] = useState<number>(10800); // 3 hrs default
  const [timerRunning, setTimerRunning] = useState(false);

  // Scratchpad Modal State
  const [scratchpadTask, setScratchpadTask] = useState<{ weekNumber: number; task: Task } | null>(null);
  const [notesText, setNotesText] = useState('');

  // Import/Export Modal State
  const [ioModalOpen, setIoModalOpen] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');

  // PWA Install Prompt State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) {
      alert("To install: Click 'Add to Home Screen' or your browser's menu -> Install App.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
      setDeferredPrompt(null);
    }
  };

  // Body Scroll Lock for Modals (Accessibility)
  useEffect(() => {
    if (scratchpadTask || ioModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [scratchpadTask, ioModalOpen]);

  // Keyboard Navigation: Escape key listener for Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (scratchpadTask) setScratchpadTask(null);
        if (ioModalOpen) setIoModalOpen(false);
        if (timerOpen) setTimerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scratchpadTask, ioModalOpen, timerOpen]);

  // Persist State to LocalStorage
  useEffect(() => {
    try {
      const stateToSave: AppState = {
        weeks,
        stats: {
          totalPyqsSolved: weeks.flatMap(w => w.tasks).filter(t => t.completed && t.pyqTarget).reduce((acc, t) => acc + (t.pyqTarget || 0), 0),
          targetPyqs: 1260
        }
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.error("Failed to save to local storage", e);
    }
  }, [weeks]);

  // Timer Countdown Logic
  useEffect(() => {
    try {
      localStorage.setItem(SUBJECTS_STORAGE_KEY, JSON.stringify(subjects));
    } catch (e) {
      console.error('Failed to save subjects to localStorage', e);
    }
  }, [subjects]);

  const toggleTopicComplete = useCallback((subjectId: string, topicId: string) => {
    setSubjects(prev => prev.map(s => {
      if (s.id !== subjectId) return s;
      return {
        ...s,
        topics: s.topics.map(t => t.id === topicId ? { ...t, completed: !t.completed } : t)
      };
    }));
  }, []);

  const subjectStats = useMemo(() => {
    const allTopics = subjects.flatMap(s => s.topics);
    const completedTopics = allTopics.filter(t => t.completed);
    return {
      total: allTopics.length,
      completed: completedTopics.length,
      pct: allTopics.length > 0 ? Math.round((completedTopics.length / allTopics.length) * 100) : 0
    };
  }, [subjects]);

  useEffect(() => {
    let timer: any = null;
    if (timerRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setTimerRunning(false);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timeLeft]);

  const switchTimerPreset = (preset: '3h' | '1h' | '8h') => {
    setTimerRunning(false);
    setActivePreset(preset);
    if (preset === '3h') setTimeLeft(10800); // 3 Hours (Night Focus / Home)
    if (preset === '1h') setTimeLeft(3600);  // 1 Hour (Office Micro)
    if (preset === '8h') setTimeLeft(28800); // 8 Hours (Weekend War)
  };

  const formatTimerTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (h > 0) {
      return `${h}:${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
    }
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Toggle Task Completion
  const toggleTask = useCallback((weekNumber: number, taskId: string) => {
    setWeeks(prev => prev.map(w => {
      if (w.weekNumber !== weekNumber) return w;
      return {
        ...w,
        tasks: w.tasks.map(t => {
          if (t.id !== taskId) return t;
          const updatedCompleted = !t.completed;
          return {
            ...t,
            completed: updatedCompleted,
            completedAt: updatedCompleted ? new Date().toISOString() : undefined
          };
        })
      };
    }));
  }, []);

  // Save Notes to Task
  const saveScratchpadNotes = useCallback(() => {
    if (!scratchpadTask) return;
    setWeeks(prev => prev.map(w => {
      if (w.weekNumber !== scratchpadTask.weekNumber) return w;
      return {
        ...w,
        tasks: w.tasks.map(t => t.id === scratchpadTask.task.id ? { ...t, notes: notesText } : t)
      };
    }));
    setScratchpadTask(null);
  }, [scratchpadTask, notesText]);

  // Memoized Stats Calculations for Performance
  const { allTasks, completedTasks, totalPyqsSolved, totalTasksCount, overallProgressPct } = useMemo(() => {
    const all = weeks.flatMap(w => w.tasks);
    const completed = all.filter(t => t.completed);
    const pyqs = completed.reduce((acc, t) => acc + (t.pyqTarget || 0), 0);
    const total = all.length;
    const pct = total > 0 ? Math.round((completed.length / total) * 100) : 0;
    return {
      allTasks: all,
      completedTasks: completed,
      totalPyqsSolved: pyqs,
      totalTasksCount: total,
      overallProgressPct: pct
    };
  }, [weeks]);

  // Countdown to GATE 2027 (Feb 1, 2027)
  const diffDays = useMemo(() => {
    const gateTargetDate = new Date('2027-02-01T09:00:00');
    const now = new Date();
    return Math.max(0, Math.ceil((gateTargetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  }, []);

  // Filtered Weeks (Memoized)
  const filteredWeeks = useMemo(() => {
    return weeks.filter(w => {
      if (activePhase !== 0 && w.phaseId !== activePhase) return false;
      return true;
    });
  }, [weeks, activePhase]);

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ weeks, subjects }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `gate_cs_2027_scrapbook_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import JSON
  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(importJsonText);
      if (parsed && Array.isArray(parsed.weeks)) {
        setWeeks(parsed.weeks);
        if (Array.isArray(parsed.subjects)) {
          setSubjects(parsed.subjects);
        }
        setIoModalOpen(false);
        setImportJsonText('');
        alert('✨ Scrapbook progress imported successfully!');
      } else {
        alert('Invalid JSON structure. Ensure it contains a "weeks" array.');
      }
    } catch (e) {
      alert('Error parsing JSON text. Check syntax.');
    }
  };

  const handleResetData = () => {
    if (window.confirm("Are you sure you want to reset all progress?")) {
      setWeeks(INITIAL_WEEKS);
      setSubjects(INITIAL_SUBJECTS);
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem(SUBJECTS_STORAGE_KEY);
    }
  };

  return (
    <div style={{
      backgroundColor: '#F5EEDC',
      backgroundImage: `radial-gradient(#d3c5a3 1px, transparent 0)`,
      backgroundSize: '24px 24px',
      color: '#2C1E16',
      minHeight: '100vh',
      width: '100%',
      maxWidth: '100vw',
      overflowX: 'hidden',
      fontFamily: "'Georgia', 'Times New Roman', serif",
      paddingBottom: '120px'
    }}>
      {/* RETRO SCRAPBOOK HEADER */}
      <header style={{
        background: '#E8DFC8',
        borderBottom: '3px dashed #8C5E3C',
        boxShadow: '0 4px 15px rgba(44, 30, 22, 0.15)',
        padding: 'clamp(16px, 3vw, 24px) clamp(16px, 4vw, 32px)',
        position: 'relative',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Paper Tape Accents */}
        <div style={{
          position: 'absolute', top: '-10px', left: 'clamp(10px, 5vw, 40px)', width: '90px', height: '24px',
          background: 'rgba(235, 220, 190, 0.7)', transform: 'rotate(-3deg)',
          border: '1px solid #C4B292', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 2
        }} />
        <div style={{
          position: 'absolute', top: '-10px', right: 'clamp(10px, 5vw, 40px)', width: '90px', height: '24px',
          background: 'rgba(235, 220, 190, 0.7)', transform: 'rotate(2deg)',
          border: '1px solid #C4B292', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 2
        }} />

        <div style={{ maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
          {/* Top Title & Vintage Badge Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 'clamp(20px, 3vw, 28px)', background: '#8C4A27', color: '#FFF8EA',
                  padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold',
                  boxShadow: '2px 2px 0px #2C1E16', border: '1px solid #2C1E16',
                  fontFamily: 'monospace'
                }}>
                  GATE CS 2027
                </span>
                <span style={{
                  fontSize: '11px', background: '#D49B35', color: '#2C1E16',
                  padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold',
                  border: '1px solid #2C1E16', textTransform: 'uppercase', letterSpacing: '0.5px'
                }}>
                  AIR &lt;100 Blueprint
                </span>
                <button
                  onClick={handleInstallApp}
                  aria-label="Install web application"
                  style={{
                    fontSize: '11px', background: '#2D5A27', color: '#FFF8EA',
                    padding: '4px 10px', borderRadius: '12px', fontWeight: 'bold',
                    border: '1px solid #2C1E16', cursor: 'pointer', display: 'flex',
                    alignItems: 'center', gap: '4px', boxShadow: '2px 2px 0px #2C1E16'
                  }}
                >
                  📲 Install App
                </button>
              </div>
              <h1 className="fluid-h1" style={{
                margin: '8px 0 0 0', color: '#2C1E16', fontWeight: 'bold',
                fontStyle: 'italic', textShadow: '1px 1px 0px #E5D5C0',
                wordBreak: 'break-word'
              }}>
                Execution Engine &amp; Syllabus Scrapbook
              </h1>
              <p className="fluid-caption" style={{ margin: '4px 0 0 0', color: '#664A38' }}>
                Strict 24-Week Working Professional Blueprint (Aug 3, 2026 – Feb 2027)
              </p>
            </div>

            {/* Retro Stats Cards */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', width: '100%', maxWidth: '400px' }}>
              {/* Countdown Stamp */}
              <div style={{
                flex: '1 1 100px', background: '#F9F3EB', border: '2px dashed #8C4A27', borderRadius: '8px',
                padding: '10px 12px', textAlign: 'center', boxShadow: '3px 3px 0px #C4B292'
              }}>
                <div style={{ fontSize: 'clamp(20px, 3vw, 24px)', fontWeight: 'bold', color: '#8C4A27', fontFamily: 'monospace' }}>
                  {diffDays}
                </div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#664A38', textTransform: 'uppercase' }}>
                  Days To GATE
                </div>
              </div>

              {/* PYQ Target Stamp */}
              <div style={{
                flex: '1 1 120px', background: '#F9F3EB', border: '2px solid #2D5A27', borderRadius: '8px',
                padding: '10px 12px', textAlign: 'center', boxShadow: '3px 3px 0px #C4B292'
              }}>
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', color: '#2D5A27', fontFamily: 'monospace' }}>
                  {totalPyqsSolved} <span style={{ fontSize: '11px', color: '#664A38' }}>/ 1260</span>
                </div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#2D5A27', textTransform: 'uppercase' }}>
                  🎯 PYQs Solved
                </div>
              </div>

              {/* Progress Stamp */}
              <div style={{
                flex: '1 1 100px', background: '#F9F3EB', border: '2px solid #4B5267', borderRadius: '8px',
                padding: '10px 12px', textAlign: 'center', boxShadow: '3px 3px 0px #C4B292'
              }}>
                <div style={{ fontSize: 'clamp(18px, 2.5vw, 20px)', fontWeight: 'bold', color: '#4B5267', fontFamily: 'monospace' }}>
                  {overallProgressPct}%
                </div>
                <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#4B5267', textTransform: 'uppercase' }}>
                  Completed
                </div>
              </div>
            </div>
          </div>

          {/* Overall Vintage Progress Bar */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 'bold', color: '#664A38', marginBottom: '4px', flexWrap: 'wrap' }}>
              <span>SCRAPBOOK COMPLETION TRACKER</span>
              <span>{completedTasks.length} / {totalTasksCount} TASKS DONE</span>
            </div>
            <div style={{
              background: '#D9CBBB', height: '14px', borderRadius: '7px',
              border: '1px solid #8C5E3C', overflow: 'hidden', padding: '2px'
            }}>
              <div style={{
                background: 'linear-gradient(90deg, #8C4A27, #D49B35, #2D5A27)',
                height: '100%', borderRadius: '5px', width: `${overallProgressPct}%`,
                transition: 'width 0.4s ease'
              }} />
            </div>
          </div>

          {/* Phase Tabs (Fully Responsive Wrapping Tablist) */}
          <div
            role="tablist"
            aria-label="Phase Filter Tabs"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: '20px',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {[
              { id: 0, label: 'All 24 Weeks', desc: 'Full Roadmap' },
              { id: 1, label: 'Phase 1: Foundation', desc: 'Wk 1-4 (Aug 3-30)' },
              { id: 2, label: 'Phase 2: Programming', desc: 'Wk 5-12 (Aug 31-Oct 25)' },
              { id: 3, label: 'Phase 3: Systems Core', desc: 'Wk 13-20 (Oct 26-Dec 20)' },
              { id: 4, label: 'Phase 4: Mocks & NAT', desc: 'Wk 21-24 (Dec 21-Feb 2027)' },
            ].map((tab) => {
              const isSelected = activePhase === tab.id;
              return (
                <button
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  aria-label={tab.label}
                  onClick={() => setActivePhase(tab.id)}
                  className="touch-target"
                  style={{
                    flex: '1 1 140px',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '2px solid #2C1E16',
                    background: isSelected ? '#8C4A27' : '#D9CBBB',
                    color: isSelected ? '#FFF8EA' : '#2C1E16',
                    fontWeight: 'bold',
                    fontSize: '13px',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '3px 3px 0px #2C1E16' : 'none',
                    transition: 'all 0.2s ease',
                    textAlign: 'center',
                    boxSizing: 'border-box'
                  }}
                >
                  <div>{tab.label}</div>
                  <div style={{ fontSize: '10px', color: isSelected ? '#F2E7D5' : '#664A38', fontWeight: 'normal', marginTop: '2px' }}>{tab.desc}</div>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main style={{
        maxWidth: '1280px', margin: '24px auto 0',
        padding: '0 clamp(16px, 3vw, 32px)',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        {/* 3-Zone Blueprint Banner Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {/* Night Deep Focus Zone */}
          <div style={{
            background: '#F9F3EB', border: '2px solid #4B5267', borderRadius: '8px',
            padding: '14px 16px', boxShadow: '3px 3px 0px #C4B292'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4B5267', fontWeight: 'bold' }}>
              <Moon size={18} />
              <span className="fluid-body">Night Deep Focus Zone</span>
            </div>
            <p className="fluid-caption" style={{ margin: '6px 0 0 0', color: '#664A38' }}>
              <strong>10:30 PM – 1:30 AM (3 Hrs Daily):</strong> Theory, proofs, algorithm execution.
            </p>
          </div>

          {/* Office Micro-Learning Zone */}
          <div style={{
            background: '#F9F3EB', border: '2px solid #2D5A27', borderRadius: '8px',
            padding: '14px 16px', boxShadow: '3px 3px 0px #C4B292'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2D5A27', fontWeight: 'bold' }}>
              <Briefcase size={18} />
              <span className="fluid-body">Office Micro-Learning Zone</span>
            </div>
            <p className="fluid-caption" style={{ margin: '6px 0 0 0', color: '#664A38' }}>
              <strong>1 Hour Max Daily (10-15m bursts):</strong> Recursion, K-Map drills, GateQA app.
            </p>
          </div>

          {/* Weekend War Zone */}
          <div style={{
            background: '#F9F3EB', border: '2px solid #C85A32', borderRadius: '8px',
            padding: '14px 16px', boxShadow: '3px 3px 0px #C4B292'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C85A32', fontWeight: 'bold' }}>
              <Swords size={18} />
              <span className="fluid-body">Weekend War Zone</span>
            </div>
            <p className="fluid-caption" style={{ margin: '6px 0 0 0', color: '#664A38' }}>
              <strong>Sat &amp; Sun (16 Hrs/Wk):</strong> PYQ sprints (50-80 Qs), weak areas, NAT mocks.
            </p>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div style={{
          background: '#E8DFC8', border: '2px solid #2C1E16', borderRadius: '8px',
          padding: '12px 16px', marginBottom: '24px', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px',
          width: '100%', boxSizing: 'border-box'
        }}>
          {/* Zone Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2C1E16', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Filter size={14} /> Zone Filter:
            </span>
            {[
              { id: 'all', label: 'All Zones' },
              { id: 'night_deep_focus', label: '🌙 Night' },
              { id: 'office_micro_learning', label: '💼 Office' },
              { id: 'weekend_war', label: '⚔️ Weekend' }
            ].map(z => (
              <button
                key={z.id}
                aria-label={`Filter by ${z.label}`}
                onClick={() => setSelectedZone(z.id)}
                className="touch-target"
                style={{
                  padding: '6px 12px', fontSize: '12px', borderRadius: '12px',
                  border: '1px solid #2C1E16', cursor: 'pointer', fontWeight: 'bold',
                  background: selectedZone === z.id ? '#8C4A27' : '#F9F3EB',
                  color: selectedZone === z.id ? '#FFF8EA' : '#2C1E16'
                }}
              >
                {z.label}
              </button>
            ))}
          </div>

          {/* Status Filter, Syllabus Tray Toggle & JSON Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#2C1E16' }}>Status:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'pending', label: 'Pending' },
              { id: 'completed', label: 'Done' }
            ].map(st => (
              <button
                key={st.id}
                aria-label={`Filter by status ${st.label}`}
                onClick={() => setSelectedStatus(st.id)}
                className="touch-target"
                style={{
                  padding: '6px 12px', fontSize: '12px', borderRadius: '12px',
                  border: '1px solid #2C1E16', cursor: 'pointer', fontWeight: 'bold',
                  background: selectedStatus === st.id ? '#2D5A27' : '#F9F3EB',
                  color: selectedStatus === st.id ? '#FFF8EA' : '#2C1E16'
                }}
              >
                {st.label}
              </button>
            ))}

            <button
              onClick={() => setChecklistTrayOpen(true)}
              aria-label="Open Syllabus Checklist Tray"
              className="touch-target"
              style={{
                padding: '6px 14px', fontSize: '12px', borderRadius: '6px',
                background: '#8C4A27', color: '#FFF8EA', border: '1px solid #2C1E16',
                fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
              }}
            >
              <CheckSquare size={14} /> Subject Checklist ({subjectStats.completed}/{subjectStats.total})
            </button>

            <button
              onClick={() => setIoModalOpen(true)}
              aria-label="Backup or restore data modal"
              className="touch-target"
              style={{
                padding: '6px 14px', fontSize: '12px', borderRadius: '6px',
                background: '#D49B35', color: '#2C1E16', border: '1px solid #2C1E16',
                fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px'
              }}
            >
              <Download size={14} /> Backup / Restore
            </button>
          </div>
        </div>

        {/* 24-WEEK ROADMAP ACCORDION CARDS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredWeeks.map((week) => {
            const isExpanded = expandedWeek === week.weekNumber;
            
            // Filter tasks inside week
            const visibleTasks = week.tasks.filter(task => {
              if (selectedZone !== 'all' && task.category !== selectedZone) return false;
              if (selectedStatus === 'completed' && !task.completed) return false;
              if (selectedStatus === 'pending' && task.completed) return false;
              return true;
            });

            const weekDoneCount = week.tasks.filter(t => t.completed).length;
            const weekTotalCount = week.tasks.length;
            const weekPct = weekTotalCount > 0 ? Math.round((weekDoneCount / weekTotalCount) * 100) : 0;

            return (
              <div
                key={week.weekNumber}
                style={{
                  background: '#F9F3EB',
                  border: '2px solid #2C1E16',
                  borderRadius: '10px',
                  boxShadow: '4px 4px 0px #C4B292',
                  overflow: 'hidden',
                  transition: 'all 0.2s ease',
                  width: '100%'
                }}
              >
                {/* Accordion Header Bar */}
                <button
                  aria-expanded={isExpanded}
                  aria-label={`Toggle Week ${week.weekNumber}: ${week.title}`}
                  onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
                  style={{
                    width: '100%', padding: '16px', background: isExpanded ? '#E8DFC8' : '#F9F3EB',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
                    alignItems: 'center', flexWrap: 'wrap', gap: '12px',
                    border: 'none', borderBottom: isExpanded ? '2px solid #2C1E16' : 'none',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', flex: 1 }}>
                    <span style={{
                      background: '#8C4A27', color: '#FFF8EA', padding: '6px 12px',
                      borderRadius: '6px', fontWeight: 'bold', fontSize: '14px',
                      border: '1px solid #2C1E16', fontFamily: 'monospace'
                    }}>
                      Week {week.weekNumber}
                    </span>

                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                        <h2 className="fluid-h2" style={{ margin: 0, fontWeight: 'bold', color: '#2C1E16', wordBreak: 'break-word' }}>
                          {week.title}
                        </h2>
                        
                        {/* IIT Madras Pivot Tag */}
                        {week.iitMadrasPivots && week.iitMadrasPivots.length > 0 && (
                          <span style={{
                            background: '#C85A32', color: '#FFF8EA', fontSize: '10px',
                            padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold',
                            border: '1px solid #2C1E16', display: 'flex', alignItems: 'center', gap: '4px'
                          }}>
                            <Flame size={12} /> IIT Madras Pivot
                          </span>
                        )}

                        {/* Deprioritized Tag */}
                        {week.deprioritizedTopics && week.deprioritizedTopics.length > 0 && (
                          <span style={{
                            background: '#664A38', color: '#FFF8EA', fontSize: '10px',
                            padding: '2px 8px', borderRadius: '10px', fontWeight: 'bold',
                            border: '1px solid #2C1E16', display: 'flex', alignItems: 'center', gap: '4px'
                          }}>
                            <Ban size={12} /> Deprioritized
                          </span>
                        )}
                      </div>
                      <p className="fluid-caption" style={{ margin: '4px 0 0 0', color: '#664A38' }}>
                        📅 {week.startDate} to {week.endDate} • {week.missionObjective}
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                    {/* Mini Progress */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#2C1E16', fontFamily: 'monospace' }}>
                        {weekDoneCount}/{weekTotalCount} Tasks ({weekPct}%)
                      </div>
                      <div style={{
                        background: '#D9CBBB', width: '80px', height: '8px', borderRadius: '4px',
                        border: '1px solid #2C1E16', overflow: 'hidden', marginTop: '2px'
                      }}>
                        <div style={{ background: '#2D5A27', height: '100%', width: `${weekPct}%` }} />
                      </div>
                    </div>

                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Accordion Expanded Body */}
                {isExpanded && (
                  <div style={{ padding: '16px', background: '#F5EEDC' }}>
                    {/* Syllabus Focus Chips */}
                    <div style={{ marginBottom: '16px', display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#664A38', textTransform: 'uppercase' }}>
                        Syllabus Focus:
                      </span>
                      {week.syllabusFocus.map((focus, idx) => (
                        <span
                          key={idx}
                          style={{
                            background: '#E8DFC8', border: '1px solid #8C5E3C',
                            color: '#2C1E16', padding: '3px 8px', borderRadius: '4px',
                            fontSize: '11px', fontWeight: 'bold'
                          }}
                        >
                          📌 {focus}
                        </span>
                      ))}

                      {/* IIT Madras Specific Pivots */}
                      {week.iitMadrasPivots && week.iitMadrasPivots.map((pivot, idx) => (
                        <span
                          key={`p_${idx}`}
                          style={{
                            background: '#FADBD8', border: '1px solid #C85A32',
                            color: '#C85A32', padding: '3px 8px', borderRadius: '4px',
                            fontSize: '11px', fontWeight: 'bold'
                          }}
                        >
                          🔥 Pivot: {pivot}
                        </span>
                      ))}

                      {/* Omit/Deprioritize Tags */}
                      {week.deprioritizedTopics && week.deprioritizedTopics.map((omit, idx) => (
                        <span
                          key={`o_${idx}`}
                          style={{
                            background: '#E5E7E9', border: '1px solid #664A38',
                            color: '#664A38', padding: '3px 8px', borderRadius: '4px',
                            fontSize: '11px', fontWeight: 'bold', textDecoration: 'line-through'
                          }}
                        >
                          🚫 Omit: {omit}
                        </span>
                      ))}
                    </div>

                    {/* Task Cards Grid (Responsive 1-Column Grid) */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
                      {visibleTasks.length === 0 ? (
                        <div style={{ fontStyle: 'italic', color: '#664A38', fontSize: '13px', padding: '8px' }}>
                          No tasks match the active filters for this week.
                        </div>
                      ) : (
                        visibleTasks.map((task) => {
                          const categoryMap: Record<string, { icon: React.ReactNode; name: string; bg: string; border: string; color: string }> = {
                            night_deep_focus: { icon: <Moon size={14} />, name: 'Night Focus (3h)', bg: '#EAECEE', border: '#4B5267', color: '#4B5267' },
                            office_micro_learning: { icon: <Briefcase size={14} />, name: 'Office Micro (1h)', bg: '#E8F8F5', border: '#2D5A27', color: '#2D5A27' },
                            weekend_war: { icon: <Swords size={14} />, name: 'Weekend War (8h)', bg: '#FADBD8', border: '#C85A32', color: '#C85A32' }
                          };
                          const categoryDetails = categoryMap[task.category] || categoryMap.night_deep_focus;

                          return (
                            <div
                              key={task.id}
                              style={{
                                background: task.completed ? '#EAF2E8' : '#FFF8EA',
                                border: `2px solid ${task.completed ? '#2D5A27' : '#2C1E16'}`,
                                borderRadius: '8px',
                                padding: '14px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'flex-start',
                                gap: '12px',
                                flexWrap: 'wrap',
                                boxShadow: task.completed ? 'none' : '2px 2px 0px #C4B292',
                                opacity: task.completed ? 0.85 : 1,
                                width: '100%',
                                boxSizing: 'border-box'
                              }}
                            >
                              {/* Left Checkbox & Info */}
                              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', flex: '1 1 240px' }}>
                                <button
                                  aria-label={task.completed ? `Mark ${task.title} as incomplete` : `Mark ${task.title} as completed`}
                                  onClick={() => toggleTask(week.weekNumber, task.id)}
                                  className="touch-target"
                                  style={{
                                    background: 'none', border: 'none', cursor: 'pointer',
                                    padding: '0', marginTop: '2px', color: task.completed ? '#2D5A27' : '#2C1E16',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                                  }}
                                >
                                  {task.completed ? <CheckSquare size={24} /> : <Square size={24} />}
                                </button>

                                <div style={{ flex: 1 }}>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                    <span style={{
                                      fontSize: '15px', fontWeight: 'bold',
                                      color: task.completed ? '#2D5A27' : '#2C1E16',
                                      textDecoration: task.completed ? 'line-through' : 'none',
                                      wordBreak: 'break-word'
                                    }}>
                                      {task.title}
                                    </span>

                                    {/* Category Stamp */}
                                    <span style={{
                                      background: categoryDetails.bg, border: `1px solid ${categoryDetails.border}`,
                                      color: categoryDetails.color, fontSize: '10px', padding: '2px 6px',
                                      borderRadius: '4px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px'
                                    }}>
                                      {categoryDetails.icon} {categoryDetails.name}
                                    </span>

                                    {/* PYQ Target Tag */}
                                    {task.pyqTarget && (
                                      <span style={{
                                        background: '#D49B35', color: '#2C1E16', fontSize: '10px',
                                        padding: '2px 6px', borderRadius: '4px', fontWeight: 'bold', border: '1px solid #2C1E16'
                                      }}>
                                        🎯 {task.pyqTarget} PYQs Target
                                      </span>
                                    )}
                                  </div>

                                  <p style={{ margin: '6px 0 0 0', fontSize: '13px', color: '#553C2B', lineHeight: 1.5 }}>
                                    {task.description}
                                  </p>

                                  {/* Notes Preview if available */}
                                  {task.notes && (
                                    <div style={{
                                      marginTop: '8px', padding: '6px 10px', background: '#F5EEDC',
                                      borderLeft: '3px solid #8C4A27', fontSize: '11px', color: '#2C1E16',
                                      fontStyle: 'italic', wordBreak: 'break-word'
                                    }}>
                                      <strong>Notes:</strong> {task.notes}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Scratchpad Action Button */}
                              <button
                                aria-label={`Open scratchpad for ${task.title}`}
                                onClick={() => {
                                  setScratchpadTask({ weekNumber: week.weekNumber, task });
                                  setNotesText(task.notes || '');
                                }}
                                className="touch-target"
                                style={{
                                  background: '#E8DFC8', border: '1px solid #2C1E16',
                                  borderRadius: '6px', padding: '8px 12px', cursor: 'pointer',
                                  fontSize: '12px', fontWeight: 'bold', color: '#2C1E16',
                                  display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
                                  alignSelf: 'center'
                                }}
                              >
                                <FileText size={15} /> Scratchpad
                              </button>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* FIXED RIGHT-EDGE SYLLABUS TRAY TOGGLE BUTTON */}
      <button
        onClick={() => setChecklistTrayOpen(true)}
        aria-label="Open Syllabus Checklist Tray"
        style={{
          position: 'fixed', right: 0, top: '40%', zIndex: 90,
          background: '#8C4A27', color: '#FFF8EA',
          border: '2px solid #2C1E16', borderRight: 'none',
          borderRadius: '8px 0 0 8px',
          padding: '12px 8px',
          boxShadow: '-3px 3px 0px #2C1E16',
          cursor: 'pointer',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
          fontWeight: 'bold', fontSize: '12px',
          transition: 'all 0.2s ease'
        }}
      >
        <CheckSquare size={18} />
        <span style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', letterSpacing: '1px', fontSize: '11px' }}>
          SYLLABUS
        </span>
        <span style={{ fontSize: '10px', background: '#D49B35', color: '#2C1E16', padding: '2px 4px', borderRadius: '3px', fontFamily: 'monospace' }}>
          {subjectStats.completed}/{subjectStats.total}
        </span>
      </button>

      {/* ═══════ SIDE TRAY: SUBJECTS & SYLLABUS CHECKLIST ═══════ */}
      {checklistTrayOpen && (() => {
        const activeSubject = activeSubjectId ? subjects.find(s => s.id === activeSubjectId) : null;

        const priorityConfig: Record<TopicPriority, { bg: string; color: string; border: string; label: string }> = {
          critical: { bg: '#FADBD8', color: '#C0392B', border: '#C0392B', label: '🔴 Critical' },
          high: { bg: '#FDEBD0', color: '#D35400', border: '#D35400', label: '🟠 High' },
          medium: { bg: '#FEF9E7', color: '#B7950B', border: '#B7950B', label: '🟡 Med' },
          low: { bg: '#E8F8F5', color: '#1E8449', border: '#1E8449', label: '🟢 Low' },
          deprioritized: { bg: '#E5E7E9', color: '#616A6B', border: '#616A6B', label: '⚫ Skip' },
        };

        return (
          <>
            {/* Backdrop overlay */}
            <div
              onClick={() => setChecklistTrayOpen(false)}
              style={{
                position: 'fixed', inset: 0,
                background: 'rgba(44, 30, 22, 0.5)',
                zIndex: 300, cursor: 'pointer'
              }}
            />

            {/* Side Tray Container */}
            <div
              role="dialog"
              aria-modal="true"
              aria-label="Syllabus Checklist"
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(440px, 100vw)',
                background: '#F5EEDC',
                borderLeft: '3px solid #2C1E16',
                boxShadow: '-6px 0 24px rgba(44,30,22,0.3)',
                zIndex: 301,
                display: 'flex', flexDirection: 'column',
                animation: 'slideInRight 0.25s ease-out'
              }}
            >
              {/* Theme Header */}
              <div style={{
                background: '#E8DFC8', padding: '16px',
                borderBottom: '2px solid #2C1E16',
                position: 'sticky', top: 0, zIndex: 2
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  {activeSubject ? (
                    <button
                      onClick={() => setActiveSubjectId('')}
                      className="touch-target"
                      style={{
                        background: '#F9F3EB', border: '1px solid #2C1E16',
                        borderRadius: '6px', padding: '4px 10px', fontSize: '12px',
                        fontWeight: 'bold', cursor: 'pointer', color: '#2C1E16'
                      }}
                    >
                      ← Back to Subjects
                    </button>
                  ) : (
                    <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#8C4A27' }}>
                      📋 GATE CS 2027 Syllabus
                    </h2>
                  )}

                  <button
                    aria-label="Close side tray"
                    onClick={() => setChecklistTrayOpen(false)}
                    className="touch-target"
                    style={{
                      background: '#F9F3EB', border: '1px solid #2C1E16',
                      borderRadius: '6px', cursor: 'pointer', color: '#2C1E16',
                      padding: '4px 8px', fontSize: '12px', fontWeight: 'bold'
                    }}
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Overall Progress */}
                <div style={{ background: '#F9F3EB', borderRadius: '6px', padding: '8px 12px', border: '1px solid #2C1E16' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#2C1E16', fontWeight: 'bold', marginBottom: '4px' }}>
                    <span>Total Progress</span>
                    <span style={{ color: '#2D5A27', fontFamily: 'monospace' }}>{subjectStats.completed}/{subjectStats.total} Topics ({subjectStats.pct}%)</span>
                  </div>
                  <div style={{ background: '#D9CBBB', height: '8px', borderRadius: '4px', border: '1px solid #8C5E3C', overflow: 'hidden' }}>
                    <div style={{ background: 'linear-gradient(90deg, #2D5A27, #D49B35)', height: '100%', width: `${subjectStats.pct}%`, transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              </div>

              {/* VIEW 1: SUBJECT LIST (when activeSubject is null) */}
              {!activeSubject && (
                <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <p style={{ margin: '0 0 4px 0', fontSize: '12px', color: '#664A38', fontWeight: 'bold' }}>
                    Select a subject to view its syllabus topics:
                  </p>
                  {subjects.map(s => {
                    const doneCount = s.topics.filter(t => t.completed).length;
                    const totalCount = s.topics.length;
                    const pct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;
                    const isDone = doneCount === totalCount;

                    return (
                      <button
                        key={s.id}
                        onClick={() => setActiveSubjectId(s.id)}
                        className="touch-target"
                        style={{
                          background: '#F9F3EB',
                          border: '2px solid #2C1E16',
                          borderRadius: '8px',
                          padding: '12px 14px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          boxShadow: '3px 3px 0px #C4B292',
                          display: 'flex', flexDirection: 'column', gap: '8px',
                          transition: 'transform 0.1s ease, boxShadow 0.1s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '20px' }}>{s.icon}</span>
                            <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#2C1E16' }}>{s.name}</span>
                          </div>
                          <span style={{
                            fontSize: '11px', fontWeight: 'bold', fontFamily: 'monospace',
                            background: isDone ? '#2D5A27' : '#E8DFC8',
                            color: isDone ? '#FFF8EA' : '#2C1E16',
                            padding: '2px 8px', borderRadius: '4px', border: '1px solid #2C1E16'
                          }}>
                            {doneCount}/{totalCount}
                          </span>
                        </div>

                        <div style={{ background: '#E8DFC8', height: '6px', borderRadius: '3px', border: '1px solid #2C1E16', overflow: 'hidden' }}>
                          <div style={{ background: isDone ? '#2D5A27' : s.color, height: '100%', width: `${pct}%`, transition: 'width 0.4s ease' }} />
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* VIEW 2: SYLLABUS TOPICS MODAL/PANEL (when activeSubject is selected) */}
              {activeSubject && (() => {
                const subjectDone = activeSubject.topics.filter(t => t.completed).length;
                const subjectTotal = activeSubject.topics.length;
                const subjectPct = subjectTotal > 0 ? Math.round((subjectDone / subjectTotal) * 100) : 0;
                const filteredTopics = activeSubject.topics.filter(t => subjectPriorityFilter === 'all' || t.priority === subjectPriorityFilter);

                return (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                    {/* Active Subject Banner & Priority Filter */}
                    <div style={{ padding: '12px 14px', background: '#F9F3EB', borderBottom: '2px solid #2C1E16' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontSize: '22px' }}>{activeSubject.icon}</span>
                          <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 'bold', color: '#2C1E16' }}>{activeSubject.name}</h3>
                        </div>
                        <span style={{ fontSize: '12px', fontFamily: 'monospace', fontWeight: 'bold', color: '#2D5A27' }}>
                          {subjectDone}/{subjectTotal} ({subjectPct}%)
                        </span>
                      </div>

                      {/* Priority Filters */}
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#664A38', marginRight: '2px' }}>Priority:</span>
                        {[
                          { id: 'all', label: 'All' },
                          { id: 'critical', label: '🔴 Critical' },
                          { id: 'high', label: '🟠 High' },
                          { id: 'medium', label: '🟡 Med' },
                          { id: 'low', label: '🟢 Low' },
                          { id: 'deprioritized', label: '⚫ Skip' },
                        ].map(pf => (
                          <button
                            key={pf.id}
                            onClick={() => setSubjectPriorityFilter(pf.id)}
                            className="touch-target"
                            style={{
                              padding: '4px 8px', fontSize: '11px', fontWeight: 'bold',
                              border: `1px solid ${subjectPriorityFilter === pf.id ? '#2C1E16' : '#8C5E3C'}`,
                              borderRadius: '4px', cursor: 'pointer',
                              background: subjectPriorityFilter === pf.id ? '#8C4A27' : '#FFF8EA',
                              color: subjectPriorityFilter === pf.id ? '#FFF8EA' : '#2C1E16'
                            }}
                          >
                            {pf.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Topic List with NORMAL Checkboxes */}
                    <div style={{ flex: 1, overflowY: 'auto', padding: '8px 14px' }}>
                      {filteredTopics.length === 0 ? (
                        <p style={{ padding: '20px', textAlign: 'center', color: '#664A38', fontStyle: 'italic', fontSize: '13px' }}>
                          No topics match this priority filter.
                        </p>
                      ) : (
                        filteredTopics.map((topic, idx) => {
                          const pc = priorityConfig[topic.priority];
                          return (
                            <label
                              key={topic.id}
                              style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 12px',
                                borderBottom: '1px solid #E8DFC8',
                                background: topic.completed ? '#EAF2E8' : idx % 2 === 0 ? '#FFF8EA' : '#F9F3EB',
                                borderRadius: '6px', marginBottom: '4px',
                                border: '1px solid #D9CBBB',
                                cursor: 'pointer',
                                transition: 'background 0.15s ease'
                              }}
                            >
                              {/* Standard Normal HTML Checkbox */}
                              <input
                                type="checkbox"
                                checked={topic.completed}
                                onChange={() => toggleTopicComplete(activeSubject.id, topic.id)}
                                style={{
                                  width: '18px', height: '18px',
                                  accentColor: '#8C4A27',
                                  cursor: 'pointer', flexShrink: 0
                                }}
                              />

                              {/* Topic Name */}
                              <span style={{
                                flex: 1, fontSize: '13px', fontWeight: 'bold',
                                color: topic.completed ? '#2D5A27' : '#2C1E16',
                                textDecoration: topic.completed ? 'line-through' : 'none',
                                textDecorationColor: '#2D5A27',
                                opacity: topic.completed ? 0.75 : 1
                              }}>
                                {topic.name}
                              </span>

                              {/* Badges */}
                              <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                                <span style={{
                                  background: pc.bg, color: pc.color,
                                  fontSize: '9px', padding: '2px 6px', borderRadius: '3px',
                                  fontWeight: 'bold', border: `1px solid ${pc.border}`
                                }}>
                                  {pc.label}
                                </span>
                                {topic.iitMadrasPivot && (
                                  <span style={{
                                    background: '#C85A32', color: '#FFF8EA',
                                    fontSize: '9px', padding: '2px 6px', borderRadius: '3px',
                                    fontWeight: 'bold', border: '1px solid #2C1E16'
                                  }}>
                                    🔥 IIT-M
                                  </span>
                                )}
                              </div>
                            </label>
                          );
                        })
                      )}
                    </div>

                    {/* Footer */}
                    <div style={{
                      padding: '10px 14px', borderTop: '2px solid #2C1E16',
                      background: '#E8DFC8', textAlign: 'center'
                    }}>
                      <span style={{ fontSize: '12px', color: '#664A38', fontWeight: 'bold' }}>
                        {subjectDone === subjectTotal ? '🎉 All topics completed for this subject!' : `${subjectTotal - subjectDone} topics remaining for ${activeSubject.name}`}
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          </>
        );
      })()} 
      {/* FLOATING FOCUS ENGINE & POMODORO TIMER DRAWER */}
      <div style={{
        position: 'fixed', bottom: '20px', right: '20px', zIndex: 100,
        maxWidth: 'calc(100vw - 40px)'
      }}>
        {timerOpen ? (
          <div
            role="dialog"
            aria-label="Focus Engine Timer"
            style={{
              background: '#F9F3EB', border: '3px solid #2C1E16', borderRadius: '12px',
              padding: '16px', boxShadow: '6px 6px 0px #C4B292', width: '300px', maxWidth: '100%'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #8C5E3C', paddingBottom: '8px', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: '#8C4A27', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
                <Clock size={16} /> Focus Engine Timer
              </span>
              <button
                aria-label="Close Focus Engine Timer"
                onClick={() => setTimerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2C1E16', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Presets: 3h (Night Focus/Home), 1h (Office Micro), 8h (Weekend War) */}
            <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
              {[
                { id: '3h', label: '🌙 3h Night' },
                { id: '1h', label: '💼 1h Office' },
                { id: '8h', label: '⚔️ 8h Weekend' },
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => switchTimerPreset(p.id as any)}
                  className="touch-target"
                  style={{
                    flex: 1, padding: '6px 4px', fontSize: '11px', fontWeight: 'bold',
                    border: '1px solid #2C1E16', borderRadius: '4px', cursor: 'pointer',
                    background: activePreset === p.id ? '#8C4A27' : '#E8DFC8',
                    color: activePreset === p.id ? '#FFF8EA' : '#2C1E16'
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Time Display */}
            <div style={{
              background: '#2C1E16', color: '#F9F3EB', padding: '16px', borderRadius: '8px',
              textAlign: 'center', fontFamily: 'monospace', fontSize: '32px', fontWeight: 'bold',
              letterSpacing: '2px', boxShadow: 'inset 0 0 8px rgba(0,0,0,0.5)'
            }}>
              {formatTimerTime(timeLeft)}
            </div>

            {/* Timer Controls */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className="touch-target"
                style={{
                  flex: 2, padding: '10px', background: timerRunning ? '#C85A32' : '#2D5A27',
                  color: '#FFF8EA', border: '1px solid #2C1E16', borderRadius: '6px',
                  fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: '6px', fontSize: '14px'
                }}
              >
                {timerRunning ? <><Pause size={16} /> Pause</> : <><Play size={16} /> Start Focus</>}
              </button>

              <button
                aria-label="Reset Timer"
                onClick={() => switchTimerPreset(activePreset)}
                className="touch-target"
                style={{
                  flex: 1, padding: '10px', background: '#E8DFC8', color: '#2C1E16',
                  border: '1px solid #2C1E16', borderRadius: '6px', fontWeight: 'bold',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                <RotateCcw size={16} />
              </button>
            </div>
          </div>
        ) : (
          <button
            aria-label="Open Focus Engine Timer"
            onClick={() => setTimerOpen(true)}
            className="touch-target"
            style={{
              background: '#8C4A27', color: '#FFF8EA', border: '2px solid #2C1E16',
              borderRadius: '30px', padding: '12px 20px', fontWeight: 'bold',
              boxShadow: '4px 4px 0px #2C1E16', cursor: 'pointer', display: 'flex',
              alignItems: 'center', gap: '8px', fontSize: '14px'
            }}
          >
            <Clock size={18} /> ⏱️ Focus Engine ({formatTimerTime(timeLeft)})
          </button>
        )}
      </div>

      {/* FOCUS SCRATCHPAD MODAL (Accessible Dialog) */}
      {scratchpadTask && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="scratchpad-heading"
          style={{
            position: 'fixed', inset: 0, background: 'rgba(44, 30, 22, 0.75)',
            zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'
          }}
        >
          <div style={{
            background: '#F9F3EB', border: '3px solid #2C1E16', borderRadius: '12px',
            width: '100%', maxWidth: '550px', padding: '20px', boxShadow: '6px 6px 0px #2C1E16',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #8C5E3C', paddingBottom: '10px', marginBottom: '14px' }}>
              <h2 id="scratchpad-heading" style={{ margin: 0, fontSize: '18px', color: '#8C4A27', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <FileText size={18} /> Focus Scratchpad &amp; Proof Notes
              </h2>
              <button
                aria-label="Close Scratchpad Modal"
                onClick={() => setScratchpadTask(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2C1E16', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <p style={{ margin: '0 0 10px 0', fontSize: '14px', fontWeight: 'bold', color: '#2C1E16', wordBreak: 'break-word' }}>
              Task: {scratchpadTask.task.title}
            </p>

            <textarea
              value={notesText}
              onChange={(e) => setNotesText(e.target.value)}
              placeholder="Jot down formulas, recursion trace, K-Map groupings, or notes..."
              rows={8}
              aria-label="Task Notes Textarea"
              style={{
                width: '100%', padding: '12px', background: '#FFF8EA', border: '2px solid #2C1E16',
                borderRadius: '6px', fontSize: '13px', color: '#2C1E16', fontFamily: 'monospace',
                resize: 'vertical', boxSizing: 'border-box'
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '14px' }}>
              <button
                onClick={() => setScratchpadTask(null)}
                className="touch-target"
                style={{
                  padding: '8px 16px', background: '#E8DFC8', color: '#2C1E16',
                  border: '1px solid #2C1E16', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={saveScratchpadNotes}
                className="touch-target"
                style={{
                  padding: '8px 16px', background: '#2D5A27', color: '#FFF8EA',
                  border: '1px solid #2C1E16', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMPORT / EXPORT DATA MODAL (Accessible Dialog) */}
      {ioModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="backup-heading"
          style={{
            position: 'fixed', inset: 0, background: 'rgba(44, 30, 22, 0.75)',
            zIndex: 200, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'
          }}
        >
          <div style={{
            background: '#F9F3EB', border: '3px solid #2C1E16', borderRadius: '12px',
            width: '100%', maxWidth: '550px', padding: '20px', boxShadow: '6px 6px 0px #2C1E16',
            maxHeight: '90vh', overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px dashed #8C5E3C', paddingBottom: '10px', marginBottom: '14px' }}>
              <h2 id="backup-heading" style={{ margin: 0, fontSize: '18px', color: '#8C4A27', fontWeight: 'bold' }}>
                📦 Backup &amp; Restore Scrapbook Data
              </h2>
              <button
                aria-label="Close Backup Modal"
                onClick={() => setIoModalOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#2C1E16', padding: '4px' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#2C1E16' }}>1. Export Scrapbook Progress</h3>
              <button
                onClick={handleExportJSON}
                className="touch-target"
                style={{
                  padding: '8px 16px', background: '#8C4A27', color: '#FFF8EA',
                  border: '1px solid #2C1E16', borderRadius: '6px', fontWeight: 'bold',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Download size={16} /> Download .json Backup
              </button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px dashed #8C5E3C', margin: '16px 0' }} />

            <div>
              <h3 style={{ margin: '0 0 6px 0', fontSize: '14px', color: '#2C1E16' }}>2. Import / Restore JSON</h3>
              <textarea
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                placeholder="Paste your JSON backup data here..."
                rows={5}
                aria-label="Import JSON Data"
                style={{
                  width: '100%', padding: '10px', background: '#FFF8EA', border: '2px solid #2C1E16',
                  borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace', boxSizing: 'border-box'
                }}
              />
              <button
                onClick={handleImportJSON}
                className="touch-target"
                style={{
                  marginTop: '8px', padding: '8px 16px', background: '#2D5A27', color: '#FFF8EA',
                  border: '1px solid #2C1E16', borderRadius: '6px', fontWeight: 'bold',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px'
                }}
              >
                <Upload size={16} /> Restore State
              </button>
            </div>

            <hr style={{ border: 'none', borderTop: '1px dashed #8C5E3C', margin: '16px 0' }} />

            <div style={{ textAlign: 'right' }}>
              <button
                onClick={handleResetData}
                className="touch-target"
                style={{
                  padding: '6px 12px', background: '#C85A32', color: '#FFF8EA',
                  border: '1px solid #2C1E16', borderRadius: '6px', fontSize: '12px',
                  fontWeight: 'bold', cursor: 'pointer'
                }}
              >
                Reset To Default 24-Week Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
