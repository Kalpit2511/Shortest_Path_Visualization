import React from 'react'
import './Algoinfo.css';

export default function Algoinfo() {

    function openCity(cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("tabcontent");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace("active", "");
        }
        // console.log('THis is runnig');
        // console.log(document.getElementById(cityName));
       document.getElementById(cityName).style.display = 'block';

        // evt.currentTarget.className += " active";
    }
    
    return (
        <>
        <div className="algobody">
        <div className="headerMenu">
                <h2>Algorithms</h2>
                <div className="closebtn">
                    <button id="cls-btn"
                        onClick={() => {
                            console.log('INside running');
                            console.log(document.getElementById('algoinfor'));
                            document.getElementById('algoinfor').className = 'hide';
                        }}>Close</button>
                </div>
            </div>



            <div className="tab">
                <button id='djbtn' className="tablinks" onClick={() => {openCity("Dijkstra")}}>Dijkstra's</button>
                <button id='asbtn' className="tablinks" onClick={()=> {openCity("Astar")}}>A-Star(A*)</button>
                <button id='bfsbtn' className="tablinks" onClick={ () => {openCity("BFS")}}>BFS</button>
                <button id='dfsbtn' className="tablinks" onClick={() => {openCity("DFS")}}>DFS</button>

            </div>

            <div id="Dijkstra" className="tabcontent">
                <h3>Dijkstra's Algorithm :</h3>
                <p>&emsp; <u>Time Complexity</u> : O (E(Log V)) / O (V + E(Log V)) where, E is the number of edges and V is the
                    number of vertices.</p>
                <p>&emsp; <u>Space Complexity</u> : O(V)</p>

                <p>• Dijkstra used this property in the opposite direction i.e we overestimate the distance of each vertex from the
                    starting vertex. Then we visit each node and its neighbours to find the shortest sub path to those neighbours.</p>
                <p>• The algorithm uses a greedy approach in the sense that we find the next best solution hoping that the result is
                    the best solution for the whole problem.</p>
                <p>• Used in both weighted and Unweighted Graphs.</p>

                <h4>Pseudo Code</h4>

                <p>1. Initialization of all nodes with distance "infinite"; initialization of the starting node with 0 </p>
                <p>2. Marking of the distance of the starting node as permanent, all other distances as temporarily.</p>
                <p>3. Setting of starting node as active.</p>
                <p>4. Calculation of the temporary distances of all neighbour nodes of the active node by summing up its distance
                    with the weights of the edges.</p>
                <p>5. If such a calculated distance of a node is smaller as the current one, update the distance and set the current
                    node as antecessor. This step is also called update and is Dijkstra's central idea.</p>
                <p>6. Setting of the node with the minimal temporary distance as active. Mark its distance as permanent.</p>
                <p>7. Repeating of steps 4 to 7 until there aren't any nodes left with a permanent distance, which neighbours still
                    have temporary distances.</p>

            </div>

            <div id="Astar" className="tabcontent">
                <h3>A-Star(A*) Algorithm : </h3>
                <p>&emsp;<u>Time Complexity</u>: - O(b^d) ; where b is the branching factor and d is the depth.</p>
                <p>• It visits the nodes based on the lowest-cost path function f(n).</p>
                <p>• It is a graph traversal and path search algorithm, which is often used in many fields of computer science due
                    to its completeness, optimality, and optimal efficiency.</p>
                <p>• Gives the optimal solution for weighted graphs but should not be used for unweighted graphs.</p>

                <h4>Pseudo Code</h4>

                <p>1. Define a list A consisting of Start node. </p>
                <p>2. If the list has no elements then return exit. </p>
                <p>3.Extract node n with the smallest value of f(n) from A and shift in list B, if node n is the destination node
                    then return exit. </p>
                <p>4.Expand node n. </p>
                <p>5.If the next node to n is the end node then trace path and return exit, if not then move further.</p>
                <p>6.If a consecutive node is not the final node repeat the process of evaluating by function f. If node is not
                    present in any list add it to list A.</p>
                <p>7. Repeat the process from point 2 until the end node is found.
                </p>
            </div>

            <div id="BFS" className="tabcontent">
                <h3>BFS Algorithm :</h3>
                <p>&emsp;<u>Time Complexity</u>: O(V+E), and V are number of vertices whereas E are number of edges.</p>
                <p>&emsp;<u>Space Complexity</u>:O(V) where V is the number of vertices.</p>
                <p>• BFS is used to determine the shortest path and minimum spanning tree.</p>
                <p>• It is an algorithm for searching a tree data structure for a node that satisfies a given property. It starts at
                    the tree root and explores all nodes (node by node) at the present depth prior to moving on to the nodes at the
                    next depth level. </p>
                <p>• Many times, its searching undergoes iterative deepening Depth-First-Search.</p>
                <p>• Breadth-first search can be generalized to graphs, when the start node is explicitly given, and precautions are
                    taken against following a vertex twice.</p>
                <p>• It gives the optimal solution for unweighted graphs or graphs with equal weight.</p>

                <h4>Pseudo Code</h4>

                <p>1. Take two input factors as (A,b), here b is the start or root node.</p>
                <p>2. Create queue A and initialize it with b.</p>
                <p>3. Note all child nodes of b. </p>
                <p>4. Remove b from the queue and visit all sub or child nodes. </p>
                <p>5. Process all the child nodes.</p>
                <p>6. Define c in A to further visit its child node. </p>
                <p>7. Repeat the process until queue A is not empty. </p>


            </div>

            <div id="DFS" className="tabcontent">
                <h3>DFS Algorithm :</h3>
                <p>&emsp;<u>Time Complexity</u>: O(V+E), and V are number of vertices whereas E are number of edges.</p>
                <p>&emsp;<u>Space Complexity</u>:O(V) where V is the number of vertices.</p>
                <p>• Depth first Search or Depth first traversal is a recursive algorithm for searching all the vertices of a graph
                    or tree data structure. Traversal means visiting all the nodes of a graph.</p>
                <p>• A standard DFS implementation puts each vertex of the graph into one of two categories:
                    1. Visited
                    2. Not Visited
                </p>
                <p>•The purpose of the algorithm is to mark each vertex as visited while avoiding cycles.</p>

                <p>• Gives optimal solution for weighted graphs but not for unweighted graphs.</p>

                <h4>Pseudo Code</h4>

                <p>1. Push the source node to the stack.</p>
                <p>2. Maintain a data structure to mark if a node is visited or not, say.</p>
                <p>3. Mark source node S as visited: visited[S] = True</p>
                <p>4. While stack is not empty repeat steps 5 - 8 below</p>
                <p>5. Pop node, say, A from the stack </p>
                <p>6. If visited[A] is True go to step 5, else go to step 7.</p>
                <p>7. Mark visited[A] = True.</p>
                <p>8. Check if A is the node that we need. If yes, break DFS. Else, push all the adjacent nodes of A which are not
                    visited into the stack.</p>

            </div>


            <div className="clearfix"></div>
        </div>
        </>
    )
}
